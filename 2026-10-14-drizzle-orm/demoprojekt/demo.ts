// demo.ts — Drizzle ORM am Musik-Katalog: Lesen, Schreiben, Auswerten.
// Zeigt zu jeder Query das erzeugte SQL (toSQL()) — ein ORM ersetzt SQL
// nicht, es erzeugt es. Laufen mit:  deno task demo
import { and, count, desc, eq, like,sql } from "drizzle-orm";
import { oeffneDb } from "./db.ts";
import { album, artist, track } from "./schema.ts";

// Datei-DB im Projektordner — bei jedem Lauf neu anlegen.
await Deno.remove("musik.db").catch(() => {/* Datei fehlt: egal */});
const db = oeffneDb("musik.db");

// --- Schreiben: insert mit .returning() ------------------------------
const aera = await db.insert(artist)
  .values({ name: "Aera", gruendungsjahr: 1999 })
  .returning();
const nova = await db.insert(artist)
  .values({ name: "Nova", gruendungsjahr: 2012 })
  .returning();
const stille = await db.insert(album)
  .values({ titel: "Silent Lines", jahr: 2015, artistId: aera[0].id })
  .returning();
await db.insert(album)
  .values({ titel: "Night Ferry", jahr: 2012, artistId: nova[0].id });
await db.insert(track)
  .values({ titel: "Silent Lines", dauerSek: 215, albumId: stille[0].id });
await db.insert(track)
  .values({ titel: "Echo Room", dauerSek: 187, albumId: stille[0].id });

// --- Lesen: select .from() .where() ----------------------------------
const fragen = db.select().from(album).where(eq(album.artistId, aera[0].id));
console.log("Lesen, erzeugtes SQL:", fragen.toSQL().sql);
console.log("Lesen, Parameter:", fragen.toSQL().params);
console.log("Lesen, Ergebnis:", await fragen);

// --- Auswerten: orderBy, limit, count --------------------------------
const neueste = await db.select().from(album).orderBy(desc(album.jahr)).limit(
  1,
);
console.log("Neuestes Album:", neueste[0].titel, "(", neueste[0].jahr, ")");

const viele = await db.select({ titel: album.titel, tracks: count() })
  .from(track)
  .innerJoin(album, eq(track.albumId, album.id))
  .groupBy(album.id);
console.log("Tracks pro Album:", viele);

// --- Ändern: update .set() .where() ----------------------------------
await db.update(track)
  .set({ dauerSek: 220 })
  .where(and(eq(track.albumId, stille[0].id), like(track.titel, "Silent%")));
const korrigiert = await db.select().from(track)
  .where(eq(track.titel, "Silent Lines"));
console.log("Nach update:", korrigiert[0].dauerSek, "Sekunden");

// --- Löschen: delete .where() ----------------------------------------
await db.delete(track).where(eq(track.titel, "Echo Room"));
const rest = await db.select({ anzahl: count() }).from(track);
console.log("Tracks nach delete:", rest[0].anzahl);

console.log("\n--- EXERCICE : INTERLEAVING (Drizzle vs SQL Pur) ---");

// --- 1. orderBy / limit ---
const q1Drizzle = db.select().from(album).orderBy(desc(album.jahr)).limit(3);
console.log("Q1 Drizzle SQL:", q1Drizzle.toSQL().sql);
// Équivalent en SQL pur :
const q1Sql = await db.all(sql`SELECT "id", "titel", "jahr", "artist_id" FROM "album" ORDER BY "jahr" DESC LIMIT 3`);
console.log("Q1 Résultat SQL Pur:", q1Sql);

// --- 2. and / eq / like ---
const q2Drizzle = db.select().from(artist).where(and(eq(artist.gruendungsjahr, 1999), like(artist.name, "Ae%")));
console.log("Q2 Drizzle SQL:", q2Drizzle.toSQL().sql);
// Équivalent en SQL pur :
const q2Sql = await db.all(sql`SELECT "id", "name", "gruendungsjahr" FROM "artist" WHERE "gruendungsjahr" = 1999 AND "name" LIKE 'Ae%'`);
console.log("Q2 Résultat SQL Pur:", q2Sql);

// --- 3. count / groupBy ---
const q3Drizzle = db.select({ artistId: album.artistId, total: count(album.id) }).from(album).groupBy(album.artistId);
console.log("Q3 Drizzle SQL:", q3Drizzle.toSQL().sql);
// Équivalent en SQL pur :
const q3Sql = await db.all(sql`SELECT "artist_id", COUNT("id") AS "total" FROM "album" GROUP BY "artist_id"`);
console.log("Q3 Résultat SQL Pur:", q3Sql);

db.$client.close();
