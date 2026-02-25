import { redirect } from 'next/navigation';

// /home was the previous path; unified to /cogno
export default function HomePage() {
  redirect('/cogno');
}
