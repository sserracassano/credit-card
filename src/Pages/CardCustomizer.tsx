import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import StyleGallery from "../Components/StyleGallery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import patterns from "../Data/patterns";
import colors from "../Data/colors";

export default function CardCustomizer() {
  const [card, setCard] = useState({
    selectedColors: [],
    selectedPattern: [],
    footer: [""],
    cvc: 123,
  });

  const storedItems = localStorage.getItem("cards");
  const savedCards = storedItems ? JSON.parse(storedItems) : [];

  const location = useLocation();
  const cardToEdit = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (cardToEdit) {
      setCard({ ...cardToEdit });
    } else {
      const randomCVC = Math.floor(Math.random() * 900) + 100;
      setCard({ ...card, cvc: randomCVC });
    }
  }, []);

  const handleChanges = (newValues: any, type: string) => {
    switch (type) {
      case "selectedColors":
        setCard({
          ...card,
          selectedPattern: [],
          selectedColors: newValues,
        });
        break;
      case "selectedPattern":
        setCard({
          ...card,
          selectedColors: [],
          selectedPattern: newValues,
        });
        break;
      case "footer":
        setCard({
          ...card,
          footer: newValues,
        });
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    if (!cardToEdit) {
      const updatedCards = [...savedCards, card];
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      navigate("/savedcards");
    } else {
      const tempCards = savedCards.filter(
        (savedCard: any) => savedCard.cvc !== cardToEdit.cvc
      );

      const updatedCards = [...tempCards, card];

      localStorage.setItem("cards", JSON.stringify(updatedCards));
      navigate("/savedcards");
    }
  };

  return (
    <div className="w-full h-full flex-col justify-center items-center ">
      {/* {cardToEdit.savedCards} */}
      <div
        id="card-section"
        className="w-full relative flex flex-col justify-center items-center "
      >
        <div className="bg-black h-60 w-full p-4 flex flex-col justify-start items-center gap-2">
          <img
            src="https://img.logoipsum.com/298.svg"
            alt="Logo"
            className="h-12 w-12"
          />
          <div className="text-white font-semibold">
            Create your <span className="text-teal-600">Custom Credit</span>{" "}
            Card!
          </div>
        </div>
        <div className="bg-white h-20 w-full p-4"></div>
        <div className="absolute bottom-2 flex justify-center items-center w-full">
          <Card
            pattern={
              card.selectedPattern.length > 0 ? card.selectedPattern : []
            }
            colors={card.selectedColors.length > 0 ? card.selectedColors : []}
            footer={card.footer}
            cvc={card.cvc}
          />
        </div>
      </div>
      <div
        id="styles-section"
        className="w-full  relative flex flex-col bg-slate-200  justify-center items-center "
      >
        <StyleGallery
          onUpdate={handleChanges}
          items={colors}
          selectedItems={card.selectedColors}
          type={"colors"}
        />
        <StyleGallery
          onUpdate={handleChanges}
          items={colors}
          selectedItems={card.footer}
          type={"footer"}
        />
        <StyleGallery
          onUpdate={handleChanges}
          items={patterns}
          selectedItems={card.selectedPattern}
          type={"pattern"}
        />
      </div>
      <button
        className=" h-20 w-20 text-white bg-black rounded-xl fixed bottom-2 left-2 "
        onClick={handleSave}
      >
        {cardToEdit ? "Salva modifica" : "Aggiungi"}
      </button>
      {!cardToEdit && (
        <Link to="/savedcards">
          <button className="h-20 w-20 text-white bg-black rounded-xl fixed bottom-2 right-2">
            Vai alle cards
          </button>
        </Link>
      )}
    </div>
  );
}
