import React from "react";
import "./../App.css"

interface IButtonProps {
	label: string;
	onClick: () => void;
	className: string;
}

export default function Button({
	label, onClick, className
}: IButtonProps) {
	return (
		<span 
			className={className} 
			onClick={onClick}
		>
			{label}
		</span>
	)
}