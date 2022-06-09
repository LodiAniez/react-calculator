import React, { useCallback, useEffect } from 'react';
import './App.css';
import ResultField from './components/ResultField';
import { useState } from 'react';
import { InputValue } from './contexts/input';
import Button from './components/Button';

interface ICalculator {
	displayValue: string;
	value: number;
	secondValue?: string;
	operator: "*" | "/" | "+" | "-" | undefined;
	calculate: boolean;
}

function App() {
	const [data, setData] = useState<ICalculator>()
	const [result, setResult] = useState<number>(0)

	const typeValue = (value: number) => {
		if (data?.operator) {
			setData({
				displayValue: data?.displayValue || "0",
				value,
				operator: data.operator || undefined,
				calculate: false,
				secondValue: data.secondValue ? `${data.secondValue}${value}` : String(value) 
			})
		} else {
			setData({
				displayValue: data?.displayValue ? `${data.displayValue}${value}` : String(value),
				value,
				operator: data?.operator || undefined,
				calculate: false 
			})
		}
	}

	const setOperator = (operator: "*" | "/" | "+" | "-") => {
		setData({
			displayValue: data?.displayValue || "0",
			value: data?.value || 0,
			operator,
			calculate: false
		})
	}

	const calc = () => {
		if (data?.displayValue && data.secondValue && data.operator) {
			switch (data.operator) {
				case "*": return setResult(parseFloat(data.displayValue) * parseFloat(data.secondValue))
				case "+": return setResult(parseFloat(data.displayValue) + parseFloat(data.secondValue))
				case "-": return setResult(parseFloat(data.displayValue) - parseFloat(data.secondValue))
				case "/": return setResult(parseFloat(data.displayValue) / parseFloat(data.secondValue))
			}
		}
	}

	useEffect(() => {
		if (!data?.operator) {
			if (data?.displayValue) {
				setResult(parseFloat(data.displayValue))
			} else {
				setResult(0)
			}
		} else {
			if (data.secondValue) {
				setResult(parseFloat(data.secondValue))
			}
		}
	}, [data])

	const keys = [
		{ 
			label: "AC", className: "button resetBtn", 
			onClick: useCallback(() => { 
				setData({
					displayValue: '0',
					value: 0,
					operator: undefined,
					calculate: false
				})
			}, [data]) 
		},
		{ 
			label: "+/-", className:"button negative operator", 
			onClick: useCallback(() => {
				const value = data?.displayValue 
										? parseFloat(data?.displayValue) 
										: 0
				
				setData({
					displayValue: (value * -1).toString(),
					value: data?.value || 0,
					operator: data?.operator || undefined,
					calculate: false
				})
			}, [data]) 
		},
		{ 
			label: "%", className: "button operator percent", 
			onClick: useCallback(() => {
				const value: number = data?.displayValue 
														? parseFloat(data.displayValue)/100 
														: data?.secondValue
														? parseFloat(data.secondValue)/100 
														: 0

				if (data?.secondValue) {
					setData({
						displayValue: data?.displayValue || "0",
						value: data?.value || 0,
						operator: data?.operator || undefined,
						calculate: false,
						secondValue: value.toString()
					})
				} else {
					setData({
						displayValue: value.toString(),
						value: data?.value || 0,
						operator: data?.operator || undefined,
						calculate: false
					})
				}
			}, [data]) 
		},
		{ label: "/", className: "button operator", onClick: useCallback(() => {setOperator("/")}, [setOperator]) },
		{ label: "7", className: "button number", onClick: useCallback(() => {typeValue(7)}, [typeValue]) },
		{ label: "8", className: "button number", onClick: useCallback(() => {typeValue(8)}, [typeValue]) },
		{ label: "9", className: "button number", onClick: useCallback(() => {typeValue(9)}, [typeValue]) },
		{ label: "*", className: "button operator", onClick: useCallback(() => {setOperator("*")}, [setOperator]) },
		{ label: "4", className: "button number", onClick: useCallback(() => {typeValue(4)}, [typeValue]) },
		{ label: "5", className: "button number", onClick: useCallback(() => {typeValue(5)}, [typeValue]) },
		{ label: "6", className: "button number", onClick: useCallback(() => {typeValue(6)}, [typeValue]) },
		{ label: "-", className: "button operator", onClick: useCallback(() => {setOperator("-")}, [setOperator]) },
		{ label: "1", className: "button number", onClick: useCallback(() => {typeValue(1)}, [typeValue]) },
		{ label: "2", className: "button number", onClick: useCallback(() => {typeValue(2)}, [typeValue]) },
		{ label: "3", className: "button number", onClick: useCallback(() => {typeValue(3)}, [typeValue]) },
		{ label: "+", className: "button operator", onClick: useCallback(() => {setOperator("+")}, [setOperator]) },
		{ label: "0", className: "button number zero-btn", onClick: useCallback(() => {typeValue(0)}, [typeValue]) },
		{ label: ".", className: "button number dot", onClick: useCallback(() => {}, [data]) },
		{ label: "=", className: "button operator", onClick: useCallback(() => {calc()}, [calc]) }
	]

  return (
		<InputValue.Provider value={result}>
			<div className="wrapper">
				<div className="container">
					<ResultField />
					<div className="buttons">
						{
							keys.map((key, index) => {
								return (
									<Button 
										className={key.className}
										label={key.label}
										onClick={key.onClick}
										key={index}
									/>
								)
							})
						}
					</div>
				</div>
			</div>
		</InputValue.Provider>
  );
}

export default App;
