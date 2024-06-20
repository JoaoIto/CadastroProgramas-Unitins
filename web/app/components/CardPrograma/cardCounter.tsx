"use client";
import React from "react";

type ProgramCountCardProps = {
  count: number;
};

export const ProgramCountCard: React.FC<ProgramCountCardProps> = ({ count }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md m-4">
      <h2 className="text-lg font-semibold">Total de Programas em Análise</h2>
      <p className="text-xl">{count}</p>
    </div>
  );
};
