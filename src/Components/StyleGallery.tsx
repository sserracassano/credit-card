// import Style from "./Style";

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
  };

  return (
    <div className="flex flex-col p-4 gap-2 w-full h-full items-center">
      <div className="flex px-4 w-full font-semibold max-w-4xl flex-row justify-start items-center gap-2">
        <div className="rounded-full h-[20px] w-[20px] text-white text-sm bg-black flex justify-center items-center">
          {type === "colors" ? "1" : "2"}
        </div>
        Choose {type === "colors" ? "Colors" : "Pattern"}
      </div>
      <div className="flex flex-row p-4 gap-4 w-full max-w-4xl overflow-x-scroll bg-white rounded-lg no-scrollbar">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded-xl h-20 w-48 min-w-[80px] overflow-hidden `}
            onClick={() =>
              type === "colors"
                ? handleClick(item, "colors")
                : handleClick(item, "pattern")
            }
            style={
              type === "pattern"
                ? { background: `url(${item})` }
                : {
                    backgroundColor: item,
                  }
            }
          >
            {selectedItems.includes(item) ? (
              <div className="w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
                <div className="rounded-full w-6 h-6 bg-white"></div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StyleGallery;
