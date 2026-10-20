import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as sqliteConfig } from "@prisma/orm-sqlite/config";

export default definePrismaConfig({
  orm: sqliteConfig({
    contract: "./prisma/schema.prisma",
  }),
});
