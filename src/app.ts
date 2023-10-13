// docker run --name api-poaCoffee-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=poacoffee -p 5432:5432 bitnami/postgresql
import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";

export const app = fastify();

app.post('/users', async (request, reply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })
    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()
})




