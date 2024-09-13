import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { access } from "fs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return {
        status: 400,
        json: { error: "User ID is required!" },
      };
    }

    const account = await prisma.account.findFirst({
        where: {
          userId: userId,
        },
        select: {
          plaid_access_token: true,
        },
      });

      if (!account) {
        return NextResponse.json(
          { error: "Access token not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { accessToken: account.plaid_access_token },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching access token:", error);
      return NextResponse.json(
        { error: "Error fetching access token" },
        { status: 500 }
      );
    }
}
