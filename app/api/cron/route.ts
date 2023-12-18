import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: "hi@example.com",
      },
    });

    if (!user) {
      return NextResponse.json({ message: "NOT FOUND" }, { status: 404 });
    }

    await db.post.create({
      data: {
        userId: user.id,
        title: "Cron Post Title",
        body: "Cron Post Description",
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
