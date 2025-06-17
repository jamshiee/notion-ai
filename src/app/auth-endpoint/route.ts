import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

type SessionClaims = {
  email?: string;
  fullName?: string;
  image?: string;
};

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const claims = sessionClaims as SessionClaims;

  const { room } = await req.json();

  if (typeof claims?.email !== "string") {
    return NextResponse.json({ message: "Unauthorized: No email found" }, { status: 401 });
  }

  const sessionEmail = claims.email;

  const session = liveblocks.prepareSession(sessionEmail, {
    userInfo: {
      name: claims.fullName || "Unknown User",
      email: sessionEmail,
      avatar: claims.image || "",
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionEmail)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }
}
