import React, { useCallback } from 'react';
import './App.css';
import ResultField from './components/ResultField';
import { useState } from 'react';
import { InputValue } from './contexts/input';
import Button from './components/Button';

interface ICalculator {
	displayValue: string;
	value: number;
	operator: "*" | "/" | "+" | "-" | undefined;
}

function App() {
	const [data, setData] = useState<ICalculator>()
	const [result, setResult] = useState<number>(0)

	const keys = [
		{ 
			label: "AC", className: "button resetBtn", 
			onClick: useCallback(() => { 
				setData({
					displayValue: '0',
					value: 0,
					operator: undefined
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
					operator: data?.operator || undefined
				})
			}, [data]) 
		},
		{ 
			label: "%", className: "button operator percent", 
			onClick: useCallback(() => {
				const value = data?.displayValue ? parseFloat(data.displayValue) : 0

				setData({
					displayValue: (value/100).toString(),
					value: data?.value || 0,
					operator: data?.operator || undefined
				})
			}, [data]) 
		},
		{ label: "/", className: "button operator", onClick: () => {} },
		{ label: "7", className: "button number", onClick: () => {} },
		{ label: "8", className: "button number", onClick: () => {} },
		{ label: "9", className: "button number", onClick: () => {} },
		{ label: "*", className: "button operator", onClick: () => {} },
		{ label: "4", className: "button number", onClick: () => {} },
		{ label: "5", className: "button number", onClick: () => {} },
		{ label: "6", className: "button number", onClick: () => {} },
		{ label: "-", className: "button operator", onClick: () => {} },
		{ label: "1", className: "button number", onClick: () => {} },
		{ label: "2", className: "button number", onClick: () => {} },
		{ label: "3", className: "button number", onClick: () => {} },
		{ label: "+", className: "button operator", onClick: () => {} },
		{ label: "0", className: "button number zero-btn", onClick: () => {} },
		{ label: ".", className: "button number dot", onClick: () => {} },
		{ label: "=", className: "button operator", onClick: () => {} }
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
