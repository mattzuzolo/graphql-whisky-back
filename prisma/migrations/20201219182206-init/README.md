# Migration `20201219182206-init`

This migration has been generated by Matt Zuzolo at 12/19/2020, 1:22:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Whisky" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" text   NOT NULL ,
"blended" boolean   NOT NULL ,
"age" integer   ,
"producerId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Producer" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" text   NOT NULL ,
"countryId" text   NOT NULL ,
"regionId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Region" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" text   NOT NULL ,
"shortName" text   ,
"alias" text   NOT NULL ,
"countryId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Country" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" text   NOT NULL ,
"shortName" text   ,
"alias" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Region.name_unique" ON "public"."Region"("name")

CREATE UNIQUE INDEX "Region.shortName_unique" ON "public"."Region"("shortName")

CREATE UNIQUE INDEX "Region.alias_unique" ON "public"."Region"("alias")

CREATE UNIQUE INDEX "Country.name_unique" ON "public"."Country"("name")

CREATE UNIQUE INDEX "Country.shortName_unique" ON "public"."Country"("shortName")

CREATE UNIQUE INDEX "Country.alias_unique" ON "public"."Country"("alias")

ALTER TABLE "public"."Whisky" ADD FOREIGN KEY ("producerId")REFERENCES "public"."Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Producer" ADD FOREIGN KEY ("countryId")REFERENCES "public"."Country"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Producer" ADD FOREIGN KEY ("regionId")REFERENCES "public"."Region"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Region" ADD FOREIGN KEY ("countryId")REFERENCES "public"."Country"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201219182206-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,71 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Whisky { // The Balvenie 12, Lagavulin 16, Angel's Envy
+  id String @id @default(uuid())
+  createdAt  DateTime  @default(now())
+  
+  name String
+  blended Boolean
+  age Int? // Maybe default to zero?
+
+  // Relationship
+  producerId  String
+  producer    Producer  @relation(fields: [producerId], references: [id])
+}
+
+model Producer { // The Balvenie, Lagavulin, Buffalo Trace
+  id String @id @default(uuid())
+  createdAt  DateTime  @default(now())
+
+  name String
+  
+  // Relationship
+  whiskys Whisky[]
+
+  countryId  String
+  country    Country  @relation(fields: [countryId], references: [id])
+
+  regionId  String?
+  region    Region?  @relation(fields: [regionId], references: [id])
+}
+
+model Region { // Islay, Kentucky
+  id String @id @default(uuid())
+  createdAt  DateTime  @default(now())
+
+  name String @unique
+  shortName String? @unique // Optional because we assign "name" to "shortName" if none is provided
+  alias String @unique // for urls
+
+
+  // Relationship
+  producers Producer[]
+  
+  // THIS IS HOW YOU GET THE INCLUDE FIELD WHEN "EAGAR LOADING"
+  // https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection#include
+  countryId  String
+  country    Country  @relation(fields: [countryId], references: [id])
+}
+
+model Country { // Scotland, Ireland, USA
+  id String @id @default(uuid())
+  createdAt  DateTime  @default(now())
+
+  name String @unique
+  shortName String? @unique
+  alias String @unique // for urls
+
+  // Relationship
+  producers Producer[]
+  regions Region[]
+}
```


