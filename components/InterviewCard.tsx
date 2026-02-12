import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
  coverImage
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-800 from-emerald-400 to-green-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.9)]",
      Mixed: "bg-light-800 from-amber-400 to-yellow-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.9)]",
      Technical: "bg-light-800 from-indigo-500 to-violet-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.9)]",
    }[normalizedType] || "bg-light-800 from-indigo-500 to-violet-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.9)]";


    const imageHoverEffect =
  {
    Behavioral:
      "group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.9)]",
    Mixed:
      "group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.9)]",
    Technical:
      "group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.9)]",
  }[normalizedType] ||
  "group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.9)]";

  const formattedDate = dayjs(
    feedback?.createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border group w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text ">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={coverImage || getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
           className={cn(
    "rounded-full object-fit size-[90px] transition-all duration-500 ease-out",
    imageHoverEffect
  )}
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calender2.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star-svgrepo-com.svg" width={18} height={18} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="relative overflow-hidden bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;