import { config } from "dotenv"
import express, { Express } from "express"
import cors from "cors"
import { route } from './middlewares/ext-route';

config()

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

route(app)

const PORT: string | number = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running on port ${ PORT }.`))