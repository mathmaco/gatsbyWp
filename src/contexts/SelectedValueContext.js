// src/contexts/SelectedValueContext.js
import React, { createContext, useState, useContext } from 'react';

// Contextを作成
export const SelectedValueContext = createContext();

// Context Provider コンポーネント
export const SelectedValueProvider = ({ children }) => {
 const [selectedValue, setSelectedValue] = useState(null);

 // Contextが提供する値
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

// Custom Hook
export const useSelectedValue = () => useContext(SelectedValueContext);
