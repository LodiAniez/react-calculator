import { Router, Request, Response } from "express";
import { insert, remove, select, update } from "./../utils/query";
import { IAddUser, IEditUser, IBatchDeleteUser } from '../models/api-payload';
import { ErrorException, hashPassword, respondError } from '../utils/util';
import { EDatabaseTables } from "./../enums/main";

const app = Router()

app.get("/list", async (req: Request, res: Response) => {
	try {
		const users = await select({
			table: EDatabaseTables.USER
		})

		res.status(200).send({
			message: "Data is fetched successfully.",
			status: true,
			data: users
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.post("/add", async (req: Request, res: Response) => {
	try {
		const {
			firstname, lastname, address, postcode,
			contact, email, username, password
		}: IAddUser = req.body

		if (!firstname) throw new ErrorException("Firstname is required.")
		if (!lastname) throw new ErrorException("Lastname is required.")
		if (!address) throw new ErrorException("Address is required.")
		if (!postcode) throw new ErrorException("Postcode is required.")
		if (!contact) throw new ErrorException("Contact is required.")
		if (!email) throw new ErrorException("Email is required.")
		if (!username) throw new ErrorException("Username is required.")
		if (!password) throw new ErrorException("Password is required.")

		const hashedPassword: string = await hashPassword(password)

		await insert({
			table: EDatabaseTables.USER,
			values: [firstname, lastname, address, postcode, contact, email, username, hashedPassword]
		})

		res.status(200).send({
			message: "User is added successfully!",
			status: true
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.post("/edit", async (req: Request, res: Response) => {
	try {
		const {
			firstname, lastname, address, postcode,
			contact, email, username, password, id
		}: IEditUser = req.body

		if (!id) throw new ErrorException("Reference id is required.")
		if (!firstname) throw new ErrorException("Firstname cannot be empty.")
		if (!lastname) throw new ErrorException("Lastname cannot be empty.")
		if (!address) throw new ErrorException("Address cannot be empty.")
		if (!postcode) throw new ErrorException("Post code cannot be empty.")
		if (!contact) throw new ErrorException("Contact cannot be empty.")
		if (!email) throw new ErrorException("Email cannot be empty.")
		if (!username) throw new ErrorException("Username cannot be empty.")
		if (!password) throw new ErrorException("Password cannot be empty.")

		const hashedPassword: string = await hashPassword(password)

		await update({
			table: EDatabaseTables.USER,
			values: [firstname, lastname, address, postcode, contact, email, username, hashedPassword],
			id
		})

		res.status(200).send({
			message: "User is updated successfully!",
			status: true
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.delete("/delete/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		if (!id) throw new ErrorException("Reference id is required.")

		await remove({
			table: EDatabaseTables.USER,
			id: [parseInt(id)]
		})

		res.status(200).send({
			message: "User is successfully removed from database.",
			status: true
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.post("/batchdelete", async (req: Request, res: Response) => {
	try {
		const { ids }: IBatchDeleteUser = req.body

		if (!ids.length) throw new ErrorException("Reference ids are required.")

		await remove({
			table: EDatabaseTables.USER,
			id: ids
		})

		res.status(200).send({
			message: "Users are successfully removed from the database.",
			status: true
		})
	} catch (err) {
		respondError(res, err)
	}
})

export default app