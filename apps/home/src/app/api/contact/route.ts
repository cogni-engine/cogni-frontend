import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'first_name',
      'last_name',
      'company_name',
      'work_mail',
      'job_title',
      'expected_user_count',
      'subject',
      'phone_number',
    ];

    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.work_mail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Parse expected_user_count from selection (e.g., "1-10 users" -> 10, "500+ users" -> 500)
    let userCount = 1;
    const userCountStr = body.expected_user_count;
    if (typeof userCountStr === 'string') {
      // Extract the upper bound number from the range
      const match = userCountStr.match(/(\d+)[\+\-]|\-(\d+)/g);
      if (match) {
        const numbers = userCountStr.match(/\d+/g)?.map(Number) || [1];
        // Take the highest number in the range
        userCount = Math.max(...numbers);
      }
    } else {
      userCount = parseInt(userCountStr);
    }

    if (isNaN(userCount) || userCount < 1) {
      return NextResponse.json(
        { error: 'Expected user count must be a positive number' },
        { status: 400 }
      );
    }

    // Validate phone_number is a number
    const phoneNumber = parseInt(body.phone_number);
    if (isNaN(phoneNumber)) {
      return NextResponse.json(
        { error: 'Phone number must be a valid number' },
        { status: 400 }
      );
    }

    // Insert data into crm.hp_leads table using Prisma
    const lead = await prisma.hp_leads.create({
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        company_name: body.company_name,
        work_mail: body.work_mail,
        job_title: body.job_title,
        expected_user_count: BigInt(userCount),
        subject: body.subject,
        phone_number: BigInt(phoneNumber),
        message: body.message || null,
      },
    });

    // Send email notification via Resend
    try {
      const resendApiKey = process.env.RESEND_API_KEY;

      if (resendApiKey) {
        const resend = new Resend(resendApiKey);

        const emailHtml = `
          <h2>New Lead Submission</h2>
          <p><strong>ID:</strong> ${lead.id}</p>
          <p><strong>Name:</strong> ${body.first_name} ${body.last_name}</p>
          <p><strong>Company:</strong> ${body.company_name}</p>
          <p><strong>Email:</strong> ${body.work_mail}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Job Title:</strong> ${body.job_title}</p>
          <p><strong>Expected Users:</strong> ${body.expected_user_count}</p>
          <p><strong>Inquiry Type:</strong> ${body.subject}</p>
          ${body.message ? `<p><strong>Message:</strong><br>${body.message}</p>` : ''}
          <p><strong>Submitted:</strong> ${lead.created_at.toISOString()}</p>
        `;

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'noreply@cogno.studio',
          to: process.env.NOTIFICATION_EMAIL || 'hello@cogno.studio',
          subject: `New Contact Form: ${body.subject}`,
          html: emailHtml,
          replyTo: body.work_mail,
        });
      }
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Error sending email notification:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: lead.id.toString(),
          created_at: lead.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
