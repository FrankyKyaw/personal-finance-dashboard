import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, accessToken, itemId } = await req.json();

    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!existingAccount) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 404 }
      );
    }

    const updatedAccount = await prisma.account.update({
      where: {
        id: existingAccount.id,
      },
      data: {
        plaid_access_token: accessToken,
        plaid_item_id: itemId,
      },
    });
    return NextResponse.json({ success: true, accountId: updatedAccount.id });
  } catch (error) {
    console.error("Error saving access token:", error);
    return NextResponse.json({ error: "Error saving access token" }, { status: 500 });
  }
}
