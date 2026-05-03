import { NextResponse } from "next/server";
import { ensureSchema, getDb } from "@/lib/db";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  partySize?: number;
  date?: string;
  time?: string;
  menu?: string;
  occasion?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const date = (body.date ?? "").trim();
  const time = (body.time ?? "").trim();
  const partySize = Number(body.partySize ?? 0);

  if (!name || !email || !date || !time || !partySize) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      message:
        "Reservation received. Database is not configured in this environment — your request would be queued in production.",
    });
  }

  try {
    await ensureSchema(db);
    await db.execute({
      sql: `INSERT INTO reservations
        (name, email, phone, party_size, date, time, menu, occasion, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        name,
        email,
        body.phone ?? null,
        partySize,
        date,
        time,
        body.menu ?? null,
        body.occasion ?? null,
        body.notes ?? null,
      ],
    });
    return NextResponse.json({
      ok: true,
      mode: "live",
      message: "Reservation received. Our maître d' will write to you shortly.",
    });
  } catch (err) {
    console.error("[reservations] insert failed", err);
    return NextResponse.json(
      { error: "Could not save reservation." },
      { status: 500 }
    );
  }
}
