import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
        <div className='flex flex-col gap-6'>
            <h2>Get Interview-Ready with AI-Powered practice & Feedback</h2>
            <p className='text-lg'>
                Practice on real interview questions & get instant feedback
            </p>
            <Button asChild className='btn-primary max-sm:w-full'>
                <Link href = "/intreview">Start an interview</Link>
            </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className='max-sm:hidden'/>
    </section>
   <section className="flex flex-col gap-6 mt-8">
  <h2>Your Interviews</h2>
  <div className="interview-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {dummyInterviews.map((interview) => (
      <InterviewCard {...interview} key={interview.id} />
    ))}
  </div>
</section>

<section className="flex flex-col gap-6 mt-8">
  <h2>Take an Interview</h2>
  <div className="interview-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {dummyInterviews.map((interview) => (
      <InterviewCard {...interview} key={interview.id} />
    ))}
  </div>
</section>
    </>
  )
}

export default page
