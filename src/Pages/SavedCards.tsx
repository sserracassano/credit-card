import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Components/Card";

export default function SavedCards() {
  const tempItems = localStorage.getItem("cards");
  const storedItems = tempItems ? JSON.parse(tempItems) : [];
  const [savedCards, setSavedCards] = useState(storedItems);
  const navigate = useNavigate();

  const cvcSum = useMemo(() => {
    return savedCards.reduce(
      (total: any, card: { cvc: any }) => total + card.cvc,
      0
    );
  }, [savedCards]);

  const deleteCard = (index: any) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const updatedCards = savedCards.filter(
        (card: any) => card !== savedCards[index]
      );
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      setSavedCards(updatedCards);
    }
  };

  const editCard = (index: any) => {
    navigate("/", { state: savedCards[index] });
  };

  return (
    <>
      <div className=" SavedCards bottom-2 flex flex-col p-4 justify-center items-center w-full h-full">
        Somma dei cvc: {cvcSum}
        {savedCards.map((cardData: any, index: React.Key) => (
          <div key={index} className="py-4  border-b border-slate-300">
            <Card
              pattern={
                cardData.selectedPattern.length > 0
                  ? cardData.selectedPattern
                  : []
              }
              colors={
                cardData.selectedColors.length > 0
                  ? cardData.selectedColors
                  : []
              }
              cvc={cardData.cvc}
              footer={cardData.footer}
            />
            <div className="Actions flex flex-row justify-between">
              <div onClick={() => deleteCard(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#fe5858"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                </svg>
              </div>
              <div onClick={() => editCard(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#5863fe"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="h-20 w-20 text-white bg-black rounded-xl fixed bottom-2 left-2">
          Indietro
        </button>
      </Link>
    </>
  );
}
