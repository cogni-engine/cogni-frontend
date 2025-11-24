'use client';

import { useState, FormEvent, useRef } from 'react';
import { Button } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';
import { CustomSelect } from '../components/CustomSelect';
import { useLanguage } from '../context/language-context';

export function Contact() {
  const { copy } = useLanguage();
  const contact = copy.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      company_name: formData.get('company_name'),
      work_mail: formData.get('work_mail'),
      job_title: formData.get('job_title'),
      expected_user_count: formData.get('expected_user_count'),
      subject: formData.get('subject'),
      phone_number: formData.get('phone_number'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        formRef.current?.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className='relative overflow-hidden bg-[#05060b]'>
      <div className='relative mx-auto max-w-4xl px-6 md:px-8 py-24'>
        <SectionTitle
          title={contact.title}
          description={contact.description}
          align='center'
        />

        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='first_name'
                className='block text-sm font-medium text-white/90 mb-2'
              >
                {contact.form.firstName} *
              </label>
              <input
                type='text'
                id='first_name'
                name='first_name'
                required
                className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
              />
            </div>

            <div>
              <label
                htmlFor='last_name'
                className='block text-sm font-medium text-white/90 mb-2'
              >
                {contact.form.lastName} *
              </label>
              <input
                type='text'
                id='last_name'
                name='last_name'
                required
                className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='company_name'
              className='block text-sm font-medium text-white/90 mb-2'
            >
              {contact.form.companyName} *
            </label>
            <input
              type='text'
              id='company_name'
              name='company_name'
              required
              className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='work_mail'
                className='block text-sm font-medium text-white/90 mb-2'
              >
                {contact.form.workMail} *
              </label>
              <input
                type='email'
                id='work_mail'
                name='work_mail'
                required
                className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
              />
            </div>

            <div>
              <label
                htmlFor='phone_number'
                className='block text-sm font-medium text-white/90 mb-2'
              >
                {contact.form.phoneNumber} *
              </label>
              <input
                type='tel'
                id='phone_number'
                name='phone_number'
                required
                className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='job_title'
                className='block text-sm font-medium text-white/90 mb-2'
              >
                {contact.form.jobTitle} *
              </label>
              <input
                type='text'
                id='job_title'
                name='job_title'
                required
                className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
              />
            </div>

            <CustomSelect
              id='expected_user_count'
              name='expected_user_count'
              label={contact.form.expectedUserCount}
              options={contact.form.expectedUserCountOptions}
              required
            />
          </div>

          <CustomSelect
            id='subject'
            name='subject'
            label={contact.form.subject}
            options={contact.form.subjectOptions}
            required
          />

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-white/90 mb-2'
            >
              {contact.form.message}
            </label>
            <textarea
              id='message'
              name='message'
              rows={4}
              className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 resize-none'
            />
          </div>

          {submitStatus === 'success' && (
            <div className='p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400'>
              {contact.form.successMessage}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className='p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400'>
              {contact.form.errorMessage}
            </div>
          )}

          <div className='flex justify-center'>
            <Button type='submit' variant='primary' disabled={isSubmitting}>
              {isSubmitting ? contact.form.submitting : contact.form.submit}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
