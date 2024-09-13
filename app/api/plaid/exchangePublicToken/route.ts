import { plaidClient } from "@/lib/plaid";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { public_token } = await req.json();
        const response = await plaidClient.itemPublicTokenExchange({
            public_token
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }

}