import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/repositories/usersRepository";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logout successful" });
}

export async function POST(req: NextRequest) {
  console.log("POST /api/users/login");
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.password = "";
    // Aqui você pode gerar um token JWT ou realizar outras ações necessárias
    const token = Math.random().toString(36).substring(7);
    (await cookies()).set("token", token);
    console.log({ token,user });

    return NextResponse.json({ message: "Login successful", user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
