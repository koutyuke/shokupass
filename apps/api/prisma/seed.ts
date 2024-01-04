import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const lockerData: Prisma.LockerUncheckedCreateInput[] = [
  {
    id: "1",
  },
  {
    id: "2",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  await prisma.locker.createMany({
    data: lockerData,
    skipDuplicates: true,
  });
  console.log(`Seeding finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
