import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action';
import { Interview } from '@/constants';

const page = async () => {
    const user = await getCurrentUser();
    const userId = user?.id ?? '';

    
    const [userInterviews, publicInterviews] = await Promise.all([
        getInterviewsByUserId(userId),
        getLatestInterviews() 
    ]);

    
     const attendedInterviewIds = new Set(userInterviews?.map(interview => interview.id));

    
    const interviewsToTake = publicInterviews?.filter(
      (interview: Interview) => !attendedInterviewIds.has(interview.id)
    );

    const hasPastInterviews = userInterviews && userInterviews.length > 0;
    const hasUpcomingInterviews = interviewsToTake && interviewsToTake.length > 0;

    return (
        <>
            <section className='card-cta'>
                <div className='flex flex-col gap-6'>
                    <h2>Get Interview-Ready with AI-Powered practice & Feedback</h2>
                    <p className='text-lg'>
                        Practice on real interview questions & get instant feedback
                    </p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href="/interview">Start an interview</Link>
                    </Button>
                </div>
                <Image src="/hulk.png" alt="robot" width={400} height={400} className='max-sm:hidden'/>
            </section>
            
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interview-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hasPastInterviews ? (
                        userInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>
                <div className="interview-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hasUpcomingInterviews ? (
                        interviewsToTake.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p>There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default page;