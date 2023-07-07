import React from "react";

type Props = {
  item: any;
  handleClick: any;
  isSelected: boolean;
  type: string;
};

function Tile({ item, handleClick, isSelected, type }: Props) {
  {
    /* <Tile item={item} key={index} handleClick={handleClick} selected={selectedItems.includes(item)} /> */
  }

  return (
    <div
      className={`rounded-xl h-20 w-48 min-w-[80px] overflow-hidden `}
      onClick={() => handleClick(item, type)}
      style={
        type === "pattern"
          ? { background: `url(${item})` }
          : {
              backgroundColor: item,
            }
      }
    >
      {isSelected && (
        <div className="w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
          <div className="rounded-full w-6 h-6 bg-white"></div>
        </div>
      )}
    </div>
  );
}

export default Tile;
