import { NextResponse, NextRequest } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { CountryCode, Products } from "plaid";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        const PLAID_PRODUCTS: Products[] = (process.env.PLAID_PRODUCTS || 'transactions').split(',') as Products[];
        const PLAID_COUNTRY_CODES: CountryCode[] = (process.env.PLAID_COUNTRY_CODES || 'US').split(',') as CountryCode[];

        const response = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: userId.toString(),
            },
            client_name: 'Personal Finance Dashboard',
            products: PLAID_PRODUCTS,
            country_codes: PLAID_COUNTRY_CODES,
            language: 'en',
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error creating link token:', error);
        return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
    }
}