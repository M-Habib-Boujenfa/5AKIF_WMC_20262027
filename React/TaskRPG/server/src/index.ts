import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm";

// 1. Initialisation de la base de données SQLite et Drizzle ORM
const sqlite = new Database("taskquest.db");
const db = drizzle(sqlite);

// 2. Définition des tables (Schémas Drizzle)
export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  level: integer("level").notNull(),
  gold: integer("gold").notNull(),
});

export const questsTable = sqliteTable("quests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  value: integer("value").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
});

// Création automatique des tables si elles n'existent pas dans taskquest.db
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    gold INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS quests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    value INTEGER NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  );
`);

// S'assurer qu'un utilisateur par défaut existe au démarrage
const existingUser = db.select().from(usersTable).get();
if (!existingUser) {
  db.insert(usersTable).values({ name: "Hero", level: 3, gold: 0 }).run();
}

// 3. Configuration d'Express
const app = express();
app.use(cors());
app.use(express.json());

// ==================== ROUTES UTILISATEUR ====================

// Récupérer le profil du héros
app.get("/api/user", (req, res) => {
  let user = db.select().from(usersTable).get();
  if (!user) {
    db.insert(usersTable).values({ name: "Hero", level: 3, gold: 0 }).run();
    user = db.select().from(usersTable).get();
  }
  res.json(user);
});

// Mettre à jour le nom du héros (généré par l'API externe RandomUser)
app.patch("/api/user/name", (req, res) => {
  const { name } = req.body;
  const user = db.select().from(usersTable).get();
  if (user) {
    db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id)).run();
    res.json({ success: true, name });
  } else {
    res.status(404).json({ error: "Utilisateur introuvable" });
  }
});

// Mettre à jour l'or du héros
app.patch("/api/user/gold", (req, res) => {
  const { gold } = req.body;
  const user = db.select().from(usersTable).get();
  if (user) {
    db.update(usersTable).set({ gold }).where(eq(usersTable.id, user.id)).run();
    res.json({ success: true, gold });
  } else {
    res.status(404).json({ error: "Utilisateur introuvable" });
  }
});

// ==================== ROUTES QUÊTES ====================

// Récupérer la liste de toutes les quêtes
app.get("/api/quests", (req, res) => {
  const quests = db.select().from(questsTable).all();
  res.json(quests);
});

// Ajouter une nouvelle quête
app.post("/api/quests", (req, res) => {
  const { title, value } = req.body;
  const result = db.insert(questsTable).values({
    title,
    value,
    completed: false,
  }).run();

  // On récupère la quête tout juste insérée pour la renvoyer au front
  const newQuest = db
    .select()
    .from(questsTable)
    .where(eq(questsTable.id, Number(result.lastInsertRowid)))
    .get();

  res.json(newQuest);
});

// Marquer une quête comme complétée
app.patch("/api/quests/:id/complete", (req, res) => {
  const id = Number(req.params.id);
  db.update(questsTable).set({ completed: true }).where(eq(questsTable.id, id)).run();
  res.json({ success: true });
});

// 4. Lancement du serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});