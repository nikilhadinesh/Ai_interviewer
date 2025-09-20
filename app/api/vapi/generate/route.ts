// app/api/vapi/generate/route.ts

import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateText } from 'ai'; // 1. Intha important import miss aagirunthuchu
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
    try {
        const { type, role, level, techstack, amount, userid } = await request.json();

        const { text: questions } = await generateText({
            model: google("models/gemini-1.5-flash-latest"),
             prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
        });

        const interviewData = {
            role,
            type,
            level,
            techstack: techstack.split(','),
            questions: JSON.parse(questions),
            userid: userid,
            finalized: true,
            createdAt: new Date().toISOString(),
            coverImage: getRandomInterviewCover(),
        };

        // 2. Inga 'Interviews' ku bathila 'interviews' nu maathiruken
        await db.collection('interviews').add(interviewData);

        return Response.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("❌ API ERROR ❌", error);
        return Response.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ success: true, data: "Thank you!" });
}