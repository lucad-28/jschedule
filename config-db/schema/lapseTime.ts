import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const lapseTime = sqliteTable(
  "lapseTime",
  {
    codL: integer("codL").primaryKey({ autoIncrement: true }),
    startL: text("startL").default(sql`CURRENT_TIME`),
    dayL: text("dayL").default(sql`CURRENT_DATE`),
  },
  (table) => ({
    codLIndex: index("codL_index").on(table.codL),
  })
);

export type LapseTime = typeof lapseTime.$inferSelect;
export type NewLapseTime = typeof lapseTime.$inferInsert;
