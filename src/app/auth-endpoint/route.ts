import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  const sessionEmail = sessionClaims?.email! as string;

  const session = liveblocks.prepareSession(sessionEmail, {
    userInfo: {
      name: sessionClaims?.fullName as string,
      email: sessionClaims?.email as string,
      avatar: sessionClaims?.image as string,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email!)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You Are not in this room" },
      { status: 403 }
    );
  }
}
