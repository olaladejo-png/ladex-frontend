import { redirect } from 'next/navigation';

// News section has been removed. Redirect to homepage.
export default function NewsPage() {
  redirect('/');
}
