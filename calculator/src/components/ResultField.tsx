import React from "react";
import "./../App.css"
import { useContext } from 'react';
import { InputValue } from "../contexts/input";

export default function ResultField() {
	console.log("Result field is rendered!")
	const result = useContext(InputValue)

	return <div className="result">{result}</div>
}