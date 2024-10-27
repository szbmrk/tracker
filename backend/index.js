import express from "express"
import bodyParser from "body-parser"
import router from "./routes/routes.js"
import cors from "cors"
import dotenv from "dotenv"
import { connectToDatabase } from "./database/db.js"
import { insertMapsIfNotExists, insertPlayerStatsIfNotExists, insertSeasonsIfNotExists } from "./database/init.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

await connectToDatabase()
await insertSeasonsIfNotExists()
await insertPlayerStatsIfNotExists()
await insertMapsIfNotExists()

app.use('/api', router)
app.listen(PORT, () => console.log("Server started on port: " + PORT))