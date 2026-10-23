import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// 1. La table des articles disponibles
export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
});

// 2. La table pour le panier
export const cartItems = sqliteTable("cart_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  articleId: integer("article_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
});