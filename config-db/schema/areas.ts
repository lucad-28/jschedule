import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { appointments } from "./appointments";
import { doctors } from "./doctors";

export const areas = sqliteTable(
  "areas",
  {
    codA: text("codA").primaryKey(),
    nameA: text("nameA").unique().notNull(),
    lenA: integer("lenA").notNull(),
  },
  (table) => ({
    codAIndex: index("coda_index").on(table.codA),
  })
);

export const areaRelations = relations(areas, ({ many }) => ({
  doctors: many(doctors),
  appointments: many(appointments),
}));

export type Area = typeof areas.$inferSelect;
export type NewArea = typeof areas.$inferInsert;
