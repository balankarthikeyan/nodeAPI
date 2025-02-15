import express from "express";
import cors from "cors";
import DB from "./db";
import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://your-frontend-domain.com",
]; // Replace with your allowed origins

const PORT = process.env.PORT || 8080;
const app = express();
let dbName = "CV_BK";
let collectionName = "Resume";

app.use(express.json());
app.use(
  cors({
    origin: (origin: any, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // !origin allows tools like postman and curl
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const dataBase = new DB();
dataBase.MONGODB_URL =
  "mongodb+srv://karthikeyanbalan:Dinner1234@bk.glsqe.mongodb.net";
dataBase.dbName = dbName;
dataBase.collectionName = collectionName;
app.get("/", async (req: any, res: any) => {
  dataBase.getDatabase({
    dbName,
    collectionName,
    onUpdate: (innerProps: any) => {
      res.send({ data: innerProps.data });
    },
  });
});
app.post("/add", async (req: any, res: any) => {
  let data = req?.body || {};
  if (!req.body) {
    res.status(400).send("Bad request");
    return; // Stop further execution after response
  }

  dataBase.doUpdateDatabase({
    dbName,
    collectionName,
    pushObjectData: data,
    onUpdate: (innerProps: any) => {
      res.json({ message: "add successful", data: req.body });
    },
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  console.log(`Deleting record with id: ${id}`);
  dataBase.doDeleteDatabase({
    dbName,
    collectionName,
    removeId: id,
    onUpdate: (innerProps: any) => {
      res.json({ message: `Record with id ${id} deleted successfully` });
    },
  });
});

app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});
