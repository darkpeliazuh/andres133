import { NextResponse } from "next/server";
import { ensureSchema, getDb } from "@/lib/db";

export const runtime = "nodejs";

type Body = { email?: string; source?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 400 }
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      message:
        "Vous êtes inscrit. (Database not configured in this environment — your address would be persisted in production.)",
    });
  }

  try {
    await ensureSchema(db);
    await db.execute({
      sql: `INSERT INTO newsletter (email, source) VALUES (?, ?)
            ON CONFLICT(email) DO NOTHING`,
      args: [email, body.source ?? "footer"],
    });
    return NextResponse.json({
      ok: true,
      mode: "live",
      message:
        "Vous êtes inscrit. The first Carnet of the season will arrive at the next equinox.",
    });
  } catch (err) {
    console.error("[newsletter] insert failed", err);
    return NextResponse.json(
      { error: "Could not save your subscription." },
      { status: 500 }
    );
  }
}
