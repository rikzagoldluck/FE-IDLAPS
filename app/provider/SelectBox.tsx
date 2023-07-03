'use client'
 
import { createContext, useState } from 'react'
 
export const SelectBoxContext = createContext({})
 
export default function SelectBox({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  
  return <SelectBoxContext.Provider value={{selectedEvent, setSelectedEvent, selectedCategory, setSelectedCategory}}>{children}</SelectBoxContext.Provider>
}