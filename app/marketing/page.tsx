import { Button } from '@/components/ui/button';

export default function MarketingPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h1 className='text-4xl font-bold'>QuizDorm</h1>
      <p className='text-xl'>Modern Quiz Platform</p>
      <div className='flex gap-4'>
        <Button>Get Started</Button>
        <Button variant='outline'>Login</Button>
      </div>
    </div>
  );
}
