"use client";
import { useState, useEffect, FC } from "react";
type ImageProps = {
  src: string;
};

export const Image: FC<ImageProps> = (props) => {
  return (
    <>
      <div className="relative">
        <img src={props.src} />
      </div>
    </>
  );
};
