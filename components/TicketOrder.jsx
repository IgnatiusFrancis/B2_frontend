"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Button from "./Button";

function TicketOrder() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`flex ${theme}-bgg justify-between items-center`}>
        <div className="flex justify-center w-1/4 p-4">
          <p className={`${theme}-text`}>Gold</p>
        </div>

        <div className="flex justify-center w-1/4 p-4">
          <p className={`${theme}-text`}>$79.99</p>
        </div>

        <div className="flex justify-center w-1/4 p-4">
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
          </select>
        </div>

        <div className="flex justify-center p-8">
          <Button title={"Buy"} />
        </div>
      </div>
    </>
  );
}

export default TicketOrder;
