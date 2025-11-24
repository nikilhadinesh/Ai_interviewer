// app/api/attend-interview/route.ts

import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { interviewId, userId } = await request.json();

    if (!interviewId || !userId) {
      return NextResponse.json({ success: false, message: "Missing interviewId or userId" }, { status: 400 });
    }

    const interviewRef = db.collection("interviews").doc(interviewId);
    
    
    await interviewRef.update({
      userid: userId
    });

    return NextResponse.json({ success: true, message: "Interview ownership updated." });
  } catch (error) {
    console.error("Error updating interview:", error);
    return NextResponse.json({ success: false, error: "Failed to update interview" }, { status: 500 });
  }
}