import { NextResponse } from "next/server";
import { Resend } from "resend";

import { solutionRegistry } from "@/content/solutions/registry";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = typeof body.phone === "string" ? body.phone.trim() : "";
        const solutionSlug =
            typeof body.solutionSlug === "string" && body.solutionSlug.trim()
                ? body.solutionSlug.trim()
                : "ai-recruiter";

        if (!phone) {
            return NextResponse.json(
                { error: "Укажите номер телефона" },
                { status: 400 },
            );
        }

        const solution = solutionRegistry.find((item) => item.slug === solutionSlug);

        if (!solution) {
            return NextResponse.json(
                { error: "Неизвестное решение" },
                { status: 400 },
            );
        }

        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error("RESEND_API_KEY is not configured");

            return NextResponse.json(
                { error: "Ошибка конфигурации сервера" },
                { status: 500 },
            );
        }

        const resend = new Resend(apiKey);

        const { error } = await resend.emails.send({
            from: `${solution.name} <onboarding@resend.dev>`,
            to: ["shurekov@gmail.com"],
            subject: `Заявка — ${solution.name}`,
            text: [
                `С вами хотят связаться по поводу ${solution.name}.`,
                "",
                `Перезвоните по номеру: ${phone}`,
                "",
                `Источник: /${solution.slug}/`,
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
