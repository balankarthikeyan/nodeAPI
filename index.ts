import express from "express"
import dotenv from "dotenv"
import DB from "./db"

dotenv.config()

const PORT = process.env.PORT || (8080 as number)
const app = express()
let dbName = "CV_BK"
let collectionName = "Resume"

app.use(express.json())
const dataBase = new DB()
dataBase.MONGODB_URL =
  "mongodb+srv://karthikeyanbalan:Dinner1234@bk.glsqe.mongodb.net"
dataBase.dbName = dbName
dataBase.collectionName = collectionName
app.get("/", async (req: any, res: any) => {
  dataBase.getDatabase({
    dbName,
    collectionName,
    onUpdate: (innerProps: any) => {
      res.send({ data: innerProps.data })
    },
  })
})
app.post("/add", async (req: any, res: any) => {
  let data = req?.body || {}
  if (!req.body) {
    res.status(400).send("Bad request")
    return // Stop further execution after response
  }

  dataBase.doUpdateDatabase({
    dbName,
    collectionName,
    pushObjectData: data,
    onUpdate: (innerProps: any) => {
      res.json({ message: "add successful", data: req.body })
    },
  })
})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id

  console.log(`Deleting record with id: ${id}`)
  dataBase.doDeleteDatabase({
    dbName,
    collectionName,
    removeId: id,
    onUpdate: (innerProps: any) => {
      res.json({ message: `Record with id ${id} deleted successfully` })
    },
  })
})

app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`)
})
