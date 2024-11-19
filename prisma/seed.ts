import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "My Bike",
    slug: "my-bike",
    content: "Tenere 700 2022 | Blue Edition",
    author: {
      connectOrCreate: {
        where: { email: "ngary@gmail.com" },
        create: { email: "ngary@gmail.com", hashedPassword: "_èçdsfsdf" },
      },
    },
  },
];

async function main() {
  console.log("Start seeding ...");

  for (const post of initialPosts) {
    const newPost = await prisma.post.create({ data: post });
    console.log(`Created post with id : " ${newPost.id} `);
  }

  console.log("Seeding finished ...");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
