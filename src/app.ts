// docker run --name api-poaCoffee-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=poacoffee -p 5432:5432 bitnami/postgresql
import fastify from "fastify";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes)



