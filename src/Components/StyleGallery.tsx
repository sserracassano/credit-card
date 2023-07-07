// import Style from "./Style";

import Tile from "./Tile";

type Props = {
  onUpdate: any;
  items: string[];
  selectedItems: string[];
  type: string;
};

function StyleGallery({ onUpdate, items, type, selectedItems }: Props) {
  const handleClick = (item: string, type: string) => {
    if (type === "pattern") {
      if (selectedItems?.includes(item)) {
        const updatedselectedColors: never[] = [];
        onUpdate(updatedselectedColors, "selectedColors");
      } else {
        onUpdate(item, "selectedPattern");
      }
    } else if (type === "colors") {
      if (selectedItems?.includes(item)) {
        const updatedselectedColors = selectedItems.filter(
          (c: string) => c !== item
        );
        onUpdate(updatedselectedColors, "selectedColors");
      } else if (selectedItems.length > 4) {
        const updatedselectedColors = [...selectedItems, item];
        const withoutFirstElement = updatedselectedColors.slice(1);
        onUpdate(withoutFirstElement, "selectedColors");
      } else if (selectedItems) {
        const updatedselectedColors = [...selectedItems, item];
        onUpdate(updatedselectedColors, "selectedColors");
      }
    }
    if (type === "footer") {
      if (selectedItems?.includes(item)) {
        const updatedFooter: string[] = [""];
        onUpdate(updatedFooter, "footer");
      } else {
        const updatedPattern = [item];
        onUpdate(updatedPattern, "footer");
      }
    }
  };

  return (
    <div className="StyleGallery flex flex-col p-4 gap-2 w-full h-full items-center">
      <div className="flex px-4 w-full font-semibold max-w-4xl flex-row justify-start items-center gap-2">
        <div className="rounded-full h-[20px] w-[20px] text-white text-sm bg-black flex justify-center items-center">
          {type === "colors" ? "1" : type === "footer" ? "2" : "3"}
        </div>
        Choose {type}
      </div>
      <div className="flex flex-row p-4 gap-4 w-full max-w-4xl overflow-x-scroll bg-white rounded-lg no-scrollbar">
        {items.map((item, index) => (
          <Tile
            key={index}
            item={item}
            handleClick={handleClick}
            isSelected={selectedItems.includes(item)}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

export default StyleGallery;
