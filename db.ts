import { MongoClient, ObjectId } from "mongodb"

class db {
  MONGODB_URL = "" as string
  globalClient = null as any
  dbName = "" as any
  collectionName = "" as string
  async setClient() {
    if (this.globalClient === null) {
      this.globalClient = await MongoClient.connect(this.MONGODB_URL)
    } else {
      console.log("Client Already Connected")
    }
  }
  async terminateClient() {
    this.globalClient.close()
    this.globalClient = null
  }

  async getDatabase(props: {
    onUpdate: (propsInner: any) => void
    dbName?: string
    collectionName?: string
  }) {
    const {
      onUpdate = () => "",
      dbName = this.dbName || "",
      collectionName = this.collectionName || "",
    } = props || {}

    await this?.setClient()
    const dbCollection = await this.globalClient
      .db(dbName)
      .collection(collectionName)
    const cursor = await dbCollection.find()
    const data = await cursor.toArray()
    onUpdate({ data })
    await this?.terminateClient()
  }

  async doUpdateDatabase(props: {
    onUpdate: (propsInner: any) => void
    dbName?: string
    collectionName?: string
    pushObjectData: any
  }) {
    const {
      onUpdate = () => "",
      dbName = this.dbName || "",
      collectionName = this.collectionName || "",
      pushObjectData = {},
    } = props || {}
    await this?.setClient()
    const dbCollection = await this.globalClient
      .db(dbName)
      .collection(collectionName)
    const insertResult = await dbCollection.insertOne(pushObjectData)
    onUpdate(insertResult)
    await this?.terminateClient()
  }
  async doDeleteDatabase(props: {
    onUpdate: (propsInner: any) => void
    dbName?: string
    collectionName?: string
    removeId: any
  }) {
    const {
      onUpdate = () => "",
      dbName = this.dbName || "",
      collectionName = this.collectionName || "",
      removeId = "",
    } = props || {}

    await this?.setClient()
    const dbCollection = await this.globalClient
      .db(dbName)
      .collection(collectionName)
    const insertResult = await dbCollection.deleteOne({
      _id: new ObjectId(removeId),
    })
    onUpdate(insertResult)
    await this?.terminateClient()
  }
}

export default db
