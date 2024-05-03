import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { userCredentials } from "./userCredentials";
import { areas } from "./areas";
import { appointments } from "./appointments";
import { workingTime } from "./workingTime";

export const doctors = sqliteTable(
  "doctors",
  {
    codDoc: text("codDoc").primaryKey(),
    nameDoc: text("nameDoc").notNull(),
    lastNameDoc: text("lastNameD").notNull(),
    codA: text("codA")
      .notNull()
      .references(() => areas.codA),
    credentialsDoc: integer("credentialsDoc")
      .notNull()
      .references(() => userCredentials.id, { onDelete: "cascade" }),
  },
  (table) => ({
    codDocIndex: index("name_index").on(table.codDoc),
  })
);

export const doctorRelations = relations(doctors, ({ one, many }) => ({
  credentials: one(userCredentials, {
    fields: [doctors.credentialsDoc],
    references: [userCredentials.id],
  }),
  area: one(areas, {
    fields: [doctors.codA],
    references: [areas.codA],
  }),
  appointments: many(appointments),
  workingTime: many(workingTime),
}));

export type Doctor = typeof doctors.$inferSelect;
export type NewDoctor = typeof doctors.$inferInsert;