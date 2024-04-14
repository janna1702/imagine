import React, { useRef, FC, useEffect } from "react";
// const element = document.createElement("input");
// element.focus();
type InputFocusProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const InputFocus: FC<InputFocusProps> = (props) => {
  //создаем реф, ссылка на html element в DOM
  //link allows to use element props (focus)
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    // inside current - HTML element, inputRef - link

    //inputRef.current - document.createElement("input");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div>
      {/* Прикрепляем ref к элементу input */}
      <input
        ref={inputRef}
        onChange={props.onChange}
        type="text"
        className="w-full h-10 rounded-md indent-3"
      />
    </div>
  );
};
