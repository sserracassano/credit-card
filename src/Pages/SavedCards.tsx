import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

export default function SavedCards() {
  const tempItems = localStorage.getItem("cards");
  const storedItems = tempItems ? JSON.parse(tempItems) : [];
  const [savedCards, setSavedCards] = useState(storedItems);

  const deleteCard = (item: any) => {
    const updatedCards = savedCards.filter((card: any) => card !== item);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setSavedCards(updatedCards);
  };

  return (
    <>
      <div className=" bottom-2 flex flex-col p-4 justify-center items-center w-full h-full">
        {savedCards.map(
          (
            cardTheme: { selectedPattern: string[]; selectedColors: string[] },
            index: React.Key
          ) => (
            <Card
              key={index}
              pattern={
                cardTheme.selectedPattern.length > 0
                  ? cardTheme.selectedPattern
                  : []
              }
              colors={
                cardTheme.selectedColors.length > 0
                  ? cardTheme.selectedColors
                  : []
              }
              action={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  deleteCard(savedCards[index]);
              }}
            />
          )
        )}
      </div>
      <Link to="/">
        <button className="h-20 w-20 text-white bg-black rounded-xl bl-align">
          Indietro
        </button>
      </Link>
    </>
  );
}
