CREATE TABLE `appointments` (
	`codApp` text PRIMARY KEY NOT NULL,
	`codPat` text NOT NULL,
	`codA` text NOT NULL,
	`codDoc` text NOT NULL,
	`codL` integer NOT NULL,
	FOREIGN KEY (`codPat`) REFERENCES `patients`(`codPat`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`codA`) REFERENCES `areas`(`codA`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`codDoc`) REFERENCES `doctors`(`codDoc`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`codL`) REFERENCES `lapseTime`(`codL`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `areas` (
	`codA` text PRIMARY KEY NOT NULL,
	`nameA` text NOT NULL,
	`lenA` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`codDoc` text PRIMARY KEY NOT NULL,
	`nameDoc` text NOT NULL,
	`lastNameD` text NOT NULL,
	`codA` text NOT NULL,
	`credentialsDoc` integer NOT NULL,
	FOREIGN KEY (`codA`) REFERENCES `areas`(`codA`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`credentialsDoc`) REFERENCES `userCredentials`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lapseTime` (
	`codL` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`startL` text DEFAULT CURRENT_TIME,
	`dayL` text DEFAULT CURRENT_DATE
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`codPat` text PRIMARY KEY NOT NULL,
	`namePat` text NOT NULL,
	`lastNameP` text NOT NULL,
	`ageP` integer NOT NULL,
	`credentialsPat` integer NOT NULL,
	FOREIGN KEY (`credentialsPat`) REFERENCES `userCredentials`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `userCredentials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`password` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp)
);
--> statement-breakpoint
CREATE TABLE `workingTime` (
	`idWorklapse` integer PRIMARY KEY NOT NULL,
	`codDoc` text NOT NULL,
	FOREIGN KEY (`idWorklapse`) REFERENCES `workLapses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`codDoc`) REFERENCES `doctors`(`codDoc`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workLapses` (
	`id` integer PRIMARY KEY NOT NULL,
	`weekDay` text NOT NULL,
	`start` text NOT NULL,
	`end` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `codapp_index` ON `appointments` (`codApp`);--> statement-breakpoint
CREATE UNIQUE INDEX `pdl_unique` ON `appointments` (`codPat`,`codDoc`,`codL`);--> statement-breakpoint
CREATE UNIQUE INDEX `areas_nameA_unique` ON `areas` (`nameA`);--> statement-breakpoint
CREATE INDEX `coda_index` ON `areas` (`codA`);--> statement-breakpoint
CREATE INDEX `name_index` ON `doctors` (`codDoc`);--> statement-breakpoint
CREATE INDEX `codL_index` ON `lapseTime` (`codL`);--> statement-breakpoint
CREATE INDEX `codpat_index` ON `patients` (`codPat`);--> statement-breakpoint
CREATE INDEX `idCredentials_index` ON `userCredentials` (`id`);--> statement-breakpoint
CREATE INDEX `idWorkingTime_index` ON `workingTime` (`idWorklapse`);--> statement-breakpoint
CREATE INDEX `idWorkLapses_index` ON `workLapses` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `lapseDay_unique` ON `workLapses` (`weekDay`,`start`,`end`);