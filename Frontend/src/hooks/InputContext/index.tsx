"use client"

import { createContext, useState } from 'react';
export interface InputContextType {
    values: { [key: string]: string };
    setValue: (name: string, value: string) => void;
}


const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [values, setValues] = useState<{ [key: string]: string }>({});

    const setValue = (name: string, value: string) => {
        setValues((prev) => ({
            ...prev,
            [name]: prev[name] !== undefined ? value : ""
        }));
    };

    return (
        <InputContext.Provider value={{ values, setValue }}>
            {children}
        </InputContext.Provider>
    );
};

export default InputContext