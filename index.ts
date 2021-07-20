import fastify from "fastify";
import { MongoClient } from "mongodb";
import { ICars } from "./interfaces/Cars";

const PORT = process.env.PORT || 8081;
//TODO: URL de la connexion

const url = "mongodb+srv://fernando:PruebaXcaret02@cluster0.zzn84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

//TODO: Nombre de la base de datos

const dbName = "Ecommerce-cars";

const server = fastify();

server.get("/", async function () {
  return "Prueba-Xcaret-2021";
});

server.get("/all", async function (): Promise<ICars[]> {
  // TODO: Utilice el método de conexión para conectarse al servidor
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("Ecommerce-cars");
  const all: ICars[] = await collection.find({}).toArray();

  // TODO: Utilice el método de cerrar conexión
  client.close();
  return all;
});

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Aplicación en ejecución:", `${address}`);
});
