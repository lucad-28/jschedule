import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as appointmentsSchema from "../../../config-db/schema/appointments";
import * as userCredentialsSchema from "../../../config-db/schema/userCredentials";
import * as areasSchema from "../../../config-db/schema/areas";
import * as doctorsSchema from "../../../config-db/schema/doctors";
import * as patientsSchema from "../../../config-db/schema/patients";
import * as lapsetimeSchema from "../../../config-db/schema/lapseTime";
import * as workingTimeSchema from "../../../config-db/schema/workingTime";
import * as workLapsesSchema from "../../../config-db/schema/workLapses";

const sqlite = new Database("config-db/dev.db");

export const db = drizzle(sqlite, {
  schema: {
    ...appointmentsSchema,
    ...userCredentialsSchema,
    ...areasSchema,
    ...doctorsSchema,
    ...patientsSchema,
    ...lapsetimeSchema,
    ...workingTimeSchema,
    ...workLapsesSchema,
  },
});
