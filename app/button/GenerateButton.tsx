"use client";
import { useState, useEffect, FC } from "react";
type GenerateBtnProps = {
  onClick: () => void;
};
export const GenerateButton: FC<GenerateBtnProps> = (props) => {
  return (
    <button
      className="w-36 h-9 bg-[rgb(81,76,254)] text-neutral-50 rounded-2xl  hover:bg-neutral-300 hover:text-neutral-900 "
      onClick={props.onClick}
    >
      Generate
    </button>
  );
};
