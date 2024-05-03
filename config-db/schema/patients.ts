import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { userCredentials } from "./userCredentials";
import { appointments } from "./appointments";	

export const patients = sqliteTable(
  "patients",
  {
    codPat: text("codPat").primaryKey(),
    namePat: text("namePat").notNull(),
    lastNameP: text("lastNameP").notNull(),
    ageP: integer("ageP").notNull(),
    credentialsPat: integer("credentialsPat")
      .notNull()
      .references(() => userCredentials.id, { onDelete: "cascade" }),
  },
  (table) => ({
    codPat: index("codpat_index").on(table.codPat),
  })
);

export const patientRelations = relations(patients, ({ one, many }) => ({
  credentials: one(userCredentials, {
    fields: [patients.credentialsPat],
    references: [userCredentials.id],
  }),
  appointments: many(appointments),
}));

export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
