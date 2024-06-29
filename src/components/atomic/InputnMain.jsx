import React from 'react';
import './input.css';  

function InputMain({ label, placeholder, type, required, children, value, onChange }) {
    return (
        <div className="input-container">
            <label htmlFor="inputField">{label}</label>
            <input
                id="inputField"
                placeholder={placeholder}
                type={type}
                className="input-field"
                required={required} 
                value={value}
                onChange={onChange}
            />
            {children}
        </div>
    );
}

export default InputMain;
