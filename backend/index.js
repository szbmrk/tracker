import express from "express"
import bodyParser from "body-parser"
import router from "./routes/routes.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', router)
app.listen(PORT, () => console.log("Server started on port: " + PORT))