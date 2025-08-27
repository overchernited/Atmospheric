"use client"

import { useContext } from "react";
import ModalContext from "./modalProvider";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be inside a modalProvider");
  }
  return context;
};
