import mysql from "mysql"

export const connection = mysql.createConnection({
	host: "localhost",
	database: "exam",
	user: "root",
	password: ""
})