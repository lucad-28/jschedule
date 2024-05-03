import {
  unique,
  index,
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { areas } from "./areas";
import { lapseTime } from "./lapseTime";
import { patients } from "./patients";
import { doctors } from "./doctors";

export const appointments = sqliteTable(
  "appointments",
  {
    codApp: text("codApp").primaryKey(),
    codPat: text("codPat")
      .notNull()
      .references(() => patients.codPat),
    codA: text("codA")
      .notNull()
      .references(() => areas.codA),
    codDoc: text("codDoc")
      .notNull()
      .references(() => doctors.codDoc),
    codL: integer("codL")
      .notNull()
      .references(() => lapseTime.codL, { onDelete: "cascade" }),
  },
  (table) => ({
    codAppIndex: index("codapp_index").on(table.codApp),
    pdlUnique: unique("pdl_unique").on(table.codPat, table.codDoc, table.codL),
  })
);

export const appointmentRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, {
    fields: [appointments.codPat],
    references: [patients.codPat],
  }),
  doctor: one(doctors, {
    fields: [appointments.codDoc],
    references: [doctors.codDoc],
  }),
  lapseTime: one(lapseTime, {
    fields: [appointments.codL],
    references: [lapseTime.codL],
  }),
  area: one(areas, {
    fields: [appointments.codA],
    references: [areas.codA],
  }),
}));

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
