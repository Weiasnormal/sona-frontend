import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/mbti-selection');
}

await fetch('https://api.vercel.app/blog', {
  next: { revalidate: 10 }, // Seconds
});
