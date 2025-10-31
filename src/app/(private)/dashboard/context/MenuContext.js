"use client";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto((prev) => !prev);

  return (
    <MenuContext.Provider value={{ menuAberto, toggleMenu, setMenuAberto }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
