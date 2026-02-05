import React from 'react'

import { getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import Agent from '@/components/Agent';
import { getRandomInterviewCover } from '@/lib/utils';
import { getCurrentUser } from '@/lib/actions/auth.actions';
const page = async ({params}: RouteParams) => {
    const {id} = await params;
    const user = await getCurrentUser();
    const interview = await getInterviewById(id);

    if(!interview)redirect('/')
  return (
    <>
    <div className='flex flex-row gap-4 justify-between w-full mb-10 items-center'>
        <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
            <div className='flex flex-row gap-4 items-center'>
                <Image src = {interview.coverImage ||getRandomInterviewCover()} alt="cover-image" width={40} height={40}
                className='rounded-full object-fit size-[40px]'/>
                <h3 className='Capitalize'>{interview.role}Interview</h3>
            </div>
            <DisplayTechIcons techStack={interview.techstack}/>
        </div>
        <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
    </div>
    <Agent
    userName={user?.name ?? ""}
    userId={user?.id}
    interviewId={id}
    type="interview" 
    questions={interview.questions}
    />
    </>
  )
}

export default page
