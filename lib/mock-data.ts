import { fakerEN_GB as faker } from "@faker-js/faker";
import { Role } from "@prisma/client";

const categories = ["Music", "Sports", "Technology", "Comedy"];

const categoryImages: Record<string, string> = {
  music: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
  sports: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  technology: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  comedy: "https://images.unsplash.com/photo-1544785349-c4a5301826fd",
};

const defaultImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085"; // Fallback image

export const generateImageUrl = (category: string): string => {
  return categoryImages[category.toLowerCase()] || defaultImage;
};
 

export const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin007",
    role: Role.ADMIN,
  },
  {
    name: "Test User",
    email: "test@example.com",
    password: "user1234",
    role: Role.USER,
  },
  ...Array.from({ length: 4 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.USER,
  })),
];

export const events = Array.from({ length: 20 }).map(() => {
  const category = faker.helpers.arrayElement(categories);

  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    startTime: faker.date.between({ from: '2025-01-01', to: Date.now() }),
    endTime: faker.date.future(),
    location: faker.location.city(),
    category,
    imageUrl: generateImageUrl(category),
    isFree: faker.datatype.boolean(),
    ticketPrice: faker.number.float({ min: 5, max: 100 }),
  };
});




