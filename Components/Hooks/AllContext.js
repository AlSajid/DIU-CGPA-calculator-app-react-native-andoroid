import React, { createContext } from 'react';
import student from './student';

export const Context = createContext(null);

export default function AllContext({ children }) {
    const Contexts = student();
    return (
        <Context.Provider value={Contexts}>
            {children}
        </Context.Provider>
    )
}
