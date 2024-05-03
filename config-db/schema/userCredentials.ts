import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userCredentials = sqliteTable(
  "userCredentials",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    password: text("password").notNull(),
    createdAt: text("createdAt").default(sql`(current_timestamp)`),
  },
  (table) => ({
    idCredentials_index: index("idCredentials_index").on(table.id),
  })
);

export type UserCredentials = typeof userCredentials.$inferSelect;
export type NewUserCredentials = typeof userCredentials.$inferInsert;