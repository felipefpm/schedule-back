import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const PORT = 3333;
const HOST = '0.0.0.0';

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  host: HOST,
  port: PORT,
}).then(() => {
  console.log('Server is running')
})