import React from "react";

type Props = {
  pattern: string[];
  colors: string[];
  footer: string[];
  cvc: number;
};

export default function Card({ pattern, colors, footer, cvc }: Props) {
  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    return `${x}% ${y}%`;
  };

  function generateBackground(colors: string[]) {
    let backgroundArray: string[] = [];
    colors.forEach((color) =>
      backgroundArray.push(
        `radial-gradient(at ${getRandomPosition()}, ${color} 0px, transparent 80%)`
      )
    );

    return backgroundArray.join(", ");
  }

  const selectedBackground =
    pattern.length > 0
      ? { background: `url(${pattern})` }
      : {
          backgroundColor: "#ffffff",
          backgroundImage: generateBackground(colors),
        };

  return (
    <div
      id="card"
      className="Card rounded-xl overflow-hidden h-48 w-96 max-w-full m-2 flex flex-col"
      style={selectedBackground}
    >
      <div id="main" className="p-4 text-lg flex-grow">
        <div className="font-semibold text-md">Mark Zuckerberg</div>
        <div className="font-medium text-sm">••••• ••••• ••••• 4090</div>
      </div>
      <div
        id="footer"
        className="px-4 py-2  text-sm h-16 relative b-0 text-white font-semibold flex flex-row justify-between w-full"
        style={{
          backgroundColor:
            footer && footer[0] !== "" ? footer[0] : "rgba(0,0,0,0.5)",
        }}
      >
        <div>
          <div className="font-thin text-sm">CVC</div>
          <div className="font-medium text-sm">{cvc}</div>
        </div>

        <div>
          <div className="font-thin text-sm">Scadenza</div>
          <div className="font-medium text-sm">12/25</div>
        </div>
      </div>
    </div>
  );
}
