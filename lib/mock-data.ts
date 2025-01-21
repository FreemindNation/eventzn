import { fakerEN_GB as faker } from "@faker-js/faker";
import { Role } from "@prisma/client";

const categories = ["Music", "Sports", "Technology", "Comedy"];

const generateImageUrl = (category: string) =>
  `https://source.unsplash.com/800x600/?${category.toLowerCase()}`;

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
    startTime: faker.date.future(),
    endTime: faker.date.future(),
    location: faker.location.city(),
    category,
    imageUrl: generateImageUrl(category),
    isFree: faker.datatype.boolean(),
    ticketPrice: faker.number.float({ min: 5, max: 100 }),
  };
});




