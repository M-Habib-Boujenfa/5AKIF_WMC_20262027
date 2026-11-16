// server/src/db.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// 1. Définition de la table User
export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  level: integer('level').notNull(),
  gold: integer('gold').notNull(),
});

// 2. Définition de la table Quests
export const questsTable = sqliteTable('quests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  value: integer('value').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull(),
});

// 3. Connexion au fichier SQLite local (qui va se créer tout seul)
const sqlite = new Database('taskquest.db');
export const db = drizzle(sqlite);