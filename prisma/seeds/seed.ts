import { PrismaClient, RoomStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create hotels
    const hotel1 = await prisma.hotel.create({
      data: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        address: {
          create: {
            id: faker.string.uuid(),
            street: faker.location.streetAddress(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
          },
        },
        roomsAvailable: 0,
        roomsBooked: 0,
      },
    });

    const hotel2 = await prisma.hotel.create({
      data: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        address: {
          create: {
            id: faker.string.uuid(),
            street: faker.location.streetAddress(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
          },
        },
        roomsAvailable: 0,
        roomsBooked: 0,
      },
    });

    const hotel3 = await prisma.hotel.create({
      data: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        address: {
          create: {
            id: faker.string.uuid(),
            street: faker.location.streetAddress(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
          },
        },
        roomsAvailable: 0,
        roomsBooked: 0,
      },
    });

    // Create rooms
    const rooms = [];
    for (let i = 1; i <= 20; i++) {
      const room = await prisma.room.create({
        data: {
          number: i,
          price: faker.number.int({ min: 50, max: 500 }), // Set your desired price here
          status: i % 2 === 0 ? RoomStatus.AVAILABLE : RoomStatus.UNAVAILABLE,
          hotelId:
            i % 3 === 1 ? hotel1.id : i % 3 === 2 ? hotel2.id : hotel3.id,
        },
      });
      rooms.push(room);
    }

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
