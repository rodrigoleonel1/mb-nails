import { NextResponse } from "next/server";
import { z } from "zod";

export function validationError(error: z.ZodError): NextResponse {
  const fields = error.issues.reduce<Record<string, string[]>>((acc, issue) => {
    const key = issue.path.join(".") || "form";
    (acc[key] ??= []).push(issue.message);
    return acc;
  }, {});

  return NextResponse.json(
    {
      error: "VALIDATION_ERROR",
      message: "Los datos enviados no son válidos.",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
      fields,
    },
    { status: 400 },
  );
}

export function badRequest(message = "La solicitud es inválida."): NextResponse {
  return NextResponse.json({ error: "BAD_REQUEST", message }, { status: 400 });
}

export function notFound(
  message = "El recurso no existe.",
): NextResponse {
  return NextResponse.json({ error: "NOT_FOUND", message }, { status: 404 });
}

export async function readJson(req: Request) {
  try {
    const body: unknown = await req.json();
    return { ok: true as const, body };
  } catch {
    return {
      ok: false as const,
      response: badRequest("El body debe ser un JSON válido."),
    };
  }
}