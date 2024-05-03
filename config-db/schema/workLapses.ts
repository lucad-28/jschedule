import {
  unique,
  index,
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const workLapses = sqliteTable(
  "workLapses",
  {
    id: integer("id").primaryKey(),
    weekDay: text("weekDay").notNull(),
    start: text("start").notNull(),
    end: text("end").notNull(),
  },
  (table) => ({
    idWorkLapses_index: index("idWorkLapses_index").on(table.id),
    lapseDayUnique: unique("lapseDay_unique").on(table.weekDay, table.start, table.end),
  })
);

export type DayLapse = typeof workLapses.$inferSelect;
export type NewDayLapse = typeof workLapses.$inferInsert;

