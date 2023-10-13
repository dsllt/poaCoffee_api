import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        name: 'ds',
        email: 'test'
    }
})


// docker run --name api-poaCoffee-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=poacoffee -p 5432:5432 bitnami/postgresql