import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = typeof body.phone === "string" ? body.phone.trim() : "";

        if (!phone) {
            return NextResponse.json(
                { error: "Укажите номер телефона" },
                { status: 400 },
            );
        }

        const { error } = await resend.emails.send({
            from: "AI-рекрутер <onboarding@resend.dev>",
            to: ["shurekov@gmail.com"],
            subject: "Заявка — AI-рекрутер",
            text: [
                "С вами хотят связаться по поводу AI-рекрутера.",
                "",
                `Перезвоните по номеру: ${phone}`,
                "",
                "Источник: /ai-recruiter/",
            ].join("\n"),
        });

        if (error) {
            console.error("Resend error:", error);

            return NextResponse.json(
                { error: "Не удалось отправить заявку" },
                { status: 500 },
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Callback error:", error);

        return NextResponse.json(
            { error: "Некорректный запрос" },
            { status: 400 },
        );
    }
}