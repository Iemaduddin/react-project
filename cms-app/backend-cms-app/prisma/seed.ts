import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [{ name: "superadmin" }, { name: "admin" }, { name: "editor" }, { name: "author" }, { name: "member" }],
    skipDuplicates: true,
  });
  console.log("Role sudah berhasil dibuat");
}

main()
  .catch((e) => {
    console.error("Seeding failed!");
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
