import React, { useState } from "react";
import Card from "../Components/Card";
import StyleGallery from "../Components/StyleGallery";
import { Link } from "react-router-dom";
import patterns from "../Data/patterns";
import colors from "../Data/colors";

export default function CardCustomizer() {
  const [cardTheme, setCardTheme] = useState({
    selectedColors: [],
    selectedPattern: [],
  });

  const storedItems = localStorage.getItem("cards");
  const savedCards = storedItems ? JSON.parse(storedItems) : [];

  const handleChanges = (newValues: any, type: string) => {
    if (type === "selectedColors") {
      setCardTheme({
        ...cardTheme,
        selectedPattern: [],
        selectedColors: newValues,
      });
    } else if (type === "selectedPattern") {
      setCardTheme({
        ...cardTheme,
        selectedColors: [],
        selectedPattern: newValues,
      });
    }
  };

  const handleSave = () => {
    const updatedCards = [...savedCards, cardTheme];
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <div className="w-full h-full flex-col justify-center items-center ">
      <div
        id="card-section"
        className="w-full relative flex flex-col justify-center items-center "
      >
        <div className="bg-black h-60 w-full p-4 flex flex-col justify-start items-center gap-2">
          <img
            src="https://www.freepnglogos.com/uploads/youtube-shorts-logo-png/red-shorts-png-logo-with-play-icon-0.png"
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
              cardTheme.selectedPattern.length > 0
                ? cardTheme.selectedPattern
                : []
            }
            colors={
              cardTheme.selectedColors.length > 0
                ? cardTheme.selectedColors
                : []
            }
            action={null}
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
          selectedItems={cardTheme.selectedColors}
          type={"colors"}
        />
        <StyleGallery
          onUpdate={handleChanges}
          items={patterns}
          selectedItems={cardTheme.selectedPattern}
          type={"pattern"}
        />
      </div>
      <button
        className="absolute h-20 w-20 text-white bg-black rounded-xl bl-align"
        onClick={handleSave}
      >
        Save
      </button>
      <Link to="/savedcards">
        <button className=" h-20 w-20 text-white bg-black rounded-xl br-align">
          Vai alle cards
        </button>
      </Link>
    </div>
  );
}
