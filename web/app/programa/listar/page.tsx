"use client"
import React from "react";
import { Sidebar } from "../../components/MenuLateral/sidebar"
import { Cabecalho } from "../../components/HeaderSearch/cabecalho";

const Programas = () => {
    return (
  <div className="flex h-screen">
    <Sidebar/>
    <Cabecalho/>
  </div>
);
}

export default Programas;