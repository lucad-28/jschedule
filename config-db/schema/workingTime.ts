import {
  unique,
  index,
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { doctors } from "./doctors";
import { workLapses } from "./workLapses";

export const workingTime = sqliteTable(
  "workingTime",
  {
    idWorklapse: integer("idWorklapse")
      .primaryKey()
      .references(() => workLapses.id),
    codDoc: text("codDoc")
      .notNull()
      .references(() => doctors.codDoc),
  },
  (table) => ({
    idWorkingTime_index: index("idWorkingTime_index").on(table.idWorklapse),
  })
);

export const workingTimeRelations = relations(workingTime, ({ one }) => ({
  doctor: one(doctors, {
    fields: [workingTime.codDoc],
    references: [doctors.codDoc],
  }),
  workday: one(workLapses, {
    fields: [workingTime.idWorklapse],
    references: [workLapses.id],
  }),
}));

export type WorkingTime = typeof workingTime.$inferSelect;
export type NewWorkingTime = typeof workingTime.$inferInsert;
