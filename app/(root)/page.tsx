import Link from "next/link";
import Image from "next/image";
import { Hourglass, Target, TrendingUp } from "lucide-react"; 

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-3xl font-extrabold tracking-tight">
      Unleash Your Potential 
    </h2>
          <ul className="flex flex-col gap-4 text-base text-white/90">
      
      {/* Point 1: Time Management */}
      <li className="flex items-start gap-3">
        <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <Hourglass className="w-6 h-6 text-yellow-400" />
            </div>
        <p>
          <span className="font-bold text-white">Respect the Clock:</span> The timer is running! Avoid delays longer than 10 seconds. Think fast, speak sharp.
        </p>
      </li>

      {/* Point 2: Focus & Confidence */}
      <li className="flex items-start gap-3">
         <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <Target className="w-6 h-6 text-red-400" />
            </div>
        <p>
          <span className="font-bold text-white">Own the Moment:</span> Maintain focus. Don't interrupt the AI. Stay calm, be confident, and let your voice shine.
        </p>
      </li>

      {/* Point 3: Feedback & Growth */}
      <li className="flex items-start gap-3">
        <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
        <p>
          <span className="font-bold text-white">Evolve & Win:</span> Low score? No problem! Check the feedback, learn from mistakes, and retry until you master it.
        </p>
      </li>

    </ul>

          {/* <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button> */}
        </div>

        <Image
          src="/hulk.png"
          alt="robo-dude"
          width={370}
          height={370}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                coverImage={interview.coverImage}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                coverImage={interview.coverImage}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;