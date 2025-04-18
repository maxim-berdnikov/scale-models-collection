import React from "react";

type PreviewProps = {
  currentCar: string;
  setCurrentCar: React.Dispatch<React.SetStateAction<string>>;
};

export const Preview: React.FC<PreviewProps> = ({
  currentCar,
  setCurrentCar,
}) => {
  if (!currentCar) {
    return null;
  }

  return (
    <img
      src={`assets/${currentCar}`}
      className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[500px] cursor-zoom-out rounded-[20px] width w-[90%]"
      onClick={() => setCurrentCar("")}
    />
  );
};
