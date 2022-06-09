import { Express } from "express"
import userRoute from "./../routes/user-route"

export const route = (app: Express) => {
	app.use("/user", userRoute)
}