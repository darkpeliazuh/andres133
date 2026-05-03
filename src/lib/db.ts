import { createClient, type Client } from "@libsql/client";

let cachedClient: Client | null = null;

/**
 * Returns a singleton Turso (libSQL) client.
 * Returns null when env vars are missing — the API route falls back to a
 * "pending" mode so the site still works in preview without credentials.
 */
export function getDb(): Client | null {
  if (cachedClient) return cachedClient;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) return null;

  cachedClient = createClient({ url, authToken });
  return cachedClient;
}

export async function ensureSchema(db: Client) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      party_size INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      menu TEXT,
      occasion TEXT,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'pending'
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      email TEXT NOT NULL UNIQUE,
      source TEXT
    )
  `);
}
