import { plaidClient } from "@/lib/plaid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is required!" },
        { status: 400 }
      );
    }

    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: "2023-01-01",
      end_date: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json(response.data.transactions);
  } catch (error: any) {
    console.error("Error in /api/plaid/transactions:", error);

    if (error.response?.data?.error_code === "ITEM_LOGIN_REQUIRED") {
      return NextResponse.json(
        { error: "ITEM_LOGIN_REQUIRED", message: error.response.data.error_message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
