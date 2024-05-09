// src/contexts/SelectedValueContext.js
import React, { createContext, useState, useContext } from 'react';

const SelectedValueContext = createContext();

export const useSelectedValue = () => useContext(SelectedValueContext);

export const SelectedValueProvider = ({ children }) => {
 const [selectedValue, setSelectedValue] = useState('');

 const value = {
  selectedValue,
  setSelectedValue
 };

 return (
  <SelectedValueContext.Provider value={value}>
   {children}
  </SelectedValueContext.Provider>
 );
};