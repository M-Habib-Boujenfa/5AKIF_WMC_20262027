import { Database } from "@db/sqlite";

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

Deno.serve({ port: 3000 }, async (req) => {
  const url = new URL(req.url);

  // --- API GET : Récupérer tous les articles ---
  if (req.method === "GET" && url.pathname === "/api/articles") {
    try {
      const stmt = sqlite.prepare("SELECT * FROM articles");
      const allArticles = stmt.all();
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
      
      const stmt = sqlite.prepare(
        "INSERT INTO articles (title, price, description) VALUES (?, ?, ?)"
      );
      stmt.run(body.title, Number(body.price), body.description || "");

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