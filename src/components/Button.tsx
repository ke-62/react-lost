import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick? : () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({children, onClick, type = 'button',
    className }) => (
        <button
            type = {type}
            onClick={onClick}
            className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`}
        >
            {children}
        </button>
);

export default Button;