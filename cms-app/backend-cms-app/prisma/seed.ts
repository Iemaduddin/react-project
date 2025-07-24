import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.role.createMany({
  //   data: [{ name: "superadmin" }, { name: "admin" }, { name: "editor" }, { name: "author" }, { name: "member" }],
  //   skipDuplicates: true,
  // });
  // console.log("Role sudah berhasil dibuat");
  await prisma.category.createMany({
    data: [
      {
        name: "Uncategorized",
        slug: "",
      },
      {
        name: "Technology",
        slug: "technology",
      },
      {
        name: "Health",
        slug: "health",
      },
      {
        name: "Lifestyle",
        slug: "lifestyle",
      },
      {
        name: "Education",
        slug: "education",
      },
      {
        name: "Travel",
        slug: "travel",
      },
      {
        name: "Food",
        slug: "food",
      },
      {
        name: "Entertainment",
        slug: "entertainment",
      },
      {
        name: "Business",
        slug: "business",
      },
      {
        name: "Sports",
        slug: "sports",
      },
      {
        name: "Science",
        slug: "science",
      },
      {
        name: "Politics",
        slug: "politics",
      },
      {
        name: "Opinion",
        slug: "opinion",
      },
      {
        name: "Culture",
        slug: "culture",
      },
      {
        name: "Environment",
        slug: "environment",
      },
      {
        name: "History",
        slug: "history",
      },
      {
        name: "Fashion",
        slug: "fashion",
      },
      {
        name: "Automotive",
        slug: "automotive",
      },
      {
        name: "Real Estate",
        slug: "real-estate",
      },
      {
        name: "Finance",
        slug: "finance",
      },
      {
        name: "Cryptocurrency",
        slug: "cryptocurrency",
      },
      {
        name: "Gaming",
        slug: "gaming",
      },
      {
        name: "Parenting",
        slug: "parenting",
      },
      {
        name: "Pets",
        slug: "pets",
      },
      {
        name: "DIY & Crafts",
        slug: "diy-crafts",
      },
      {
        name: "Home & Garden",
        slug: "home-garden",
      },
      {
        name: "Music",
        slug: "music",
      },
      {
        name: "Podcasts",
        slug: "podcasts",
      },
      {
        name: "Books",
        slug: "books",
      },
      {
        name: "Movies & TV Shows",
        slug: "movies-tv-shows",
      },
      {
        name: "Comics & Animation",
        slug: "comics-animation",
      },
      {
        name: "Art & Design",
        slug: "art-design",
      },
      {
        name: "Photography",
        slug: "photography",
      },
      {
        name: "Theater & Performing Arts",
        slug: "theater-performing-arts",
      },
      {
        name: "Mental Health",
        slug: "mental-health",
      },
      {
        name: "Personal Development",
        slug: "personal-development",
      },
      {
        name: "Relationships",
        slug: "relationships",
      },
      {
        name: "Spirituality & Religion",
        slug: "spirituality-religion",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Category sudah berhasil dibuat");
}

main()
  .catch((e) => {
    console.error("Seeding failed!");
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
