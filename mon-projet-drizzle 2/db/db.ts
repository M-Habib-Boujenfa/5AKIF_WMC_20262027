import { drizzle } from "drizzle-orm/sqlite-proxy";
import { Database } from "@db/sqlite";
import * as schema from "./schema.ts";

// 1. Initialisation de la base de données SQLite (fichier local, ex: sqlite.db)
const sqlite = new Database("sqlite.db");

// 2. Création automatique de la table articles si elle n'existe pas
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT
  );
`);

// 3. Configuration de Drizzle ORM avec le proxy SQLite
export const db = drizzle(
  async (sql, params, method) => {
    try {
      const stmt = sqlite.prepare(sql);
      if (method === "all") {
        const rows = stmt.all(...params);
        return { rows };
      } else if (method === "run") {
        const info = stmt.run(...params);
        return { rows: [] };
      } else if (method === "get") {
        const row = stmt.get(...params);
        return { rows: row ? [row] : [] };
      }
      return { rows: [] };
    } catch (e: any) {
      console.error("Erreur Drizzle:", e);
      throw e;
    }
  },
  { schema }
);