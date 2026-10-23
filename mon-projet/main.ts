import { drizzle } from "drizzle-orm/sqlite-proxy";
import { Database } from "@db/sqlite";
import * as schema from "./db/schema.ts";
import { articles } from "./db/schema.ts";

// Initialisation de la base SQLite et création automatique de la table si absente
const sqlite = new Database("sqlite.db");
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT
  );
`);

export const db = drizzle(
  async (sql, params, method) => {
    try {
      const stmt = sqlite.prepare(sql);
      if (method === "all") {
        return { rows: stmt.all(...params) };
      } else if (method === "run") {
        stmt.run(...params);
        return { rows: [] };
      } else if (method === "get") {
        const row = stmt.get(...params);
        return { rows: row ? [row] : [] };
      }
      return { rows: [] };
    } catch (e) {
      console.error("Erreur Drizzle:", e);
      throw e;
    }
  },
  { schema }
);

Deno.serve({ port: 3000 }, async (req) => {
  const url = new URL(req.url);

  // --- API GET : Récupérer tous les articles ---
  if (req.method === "GET" && url.pathname === "/api/articles") {
    try {
      const allArticles = db.select().from(articles).all();
      return Response.json(allArticles);
    } catch (error) {
      console.error("Erreur GET /api/articles:", error);
      return Response.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  // --- API POST : Ajouter un article ---
  if (req.method === "POST" && url.pathname === "/api/articles") {
    try {
      const body = await req.json();
      
      // Insertion en base avec exécution .run()
      db.insert(articles).values({
        title: body.title,
        price: Number(body.price),
        description: body.description || "",
      }).run();

      return Response.json({ success: true, message: "Article ajouté avec succès !" });
    } catch (error) {
      console.error("Erreur POST /api/articles:", error);
      return Response.json({ success: false, error: "Erreur lors de l'ajout" }, { status: 500 });
    }
  }

  // --- SERVIR LES FICHIERS STATIQUES (HTML, JS, CSS) ---
  let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  try {
    const fileContent = await Deno.readFile(`./public${filePath}`);
    let contentType = "text/html";
    if (filePath.endsWith(".js")) contentType = "application/javascript";
    if (filePath.endsWith(".css")) contentType = "text/css";

    return new Response(fileContent, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("Page non trouvée", { status: 404 });
  }
});

console.log("Serveur démarré sur http://localhost:3000");