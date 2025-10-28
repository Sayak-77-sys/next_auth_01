import {NextResponse} from 'next/server';

export async function GET(){
    try {
        const response = NextResponse.json({ message: "Logout successful" ,
         success: true   
        });
        
        // Clear the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}