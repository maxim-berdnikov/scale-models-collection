import React from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

type PreviewProps = {
  currentCar: string;
  setCurrentCar: React.Dispatch<React.SetStateAction<string>>;
};

export const Preview: React.FC<PreviewProps> = ({
  currentCar,
  setCurrentCar,
}) => {
  const handlePreviewClose = () => {
    setCurrentCar("");
    document.body.classList.remove("overflow-y-hidden");
  };

  const ref = useOutsideClick<HTMLImageElement>(handlePreviewClose);

  if (!currentCar) {
    return null;
  }

  return (
    <div
      className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[500px] cursor-zoom-out rounded-[20px] width w-[90%] overflow-hidden"
      onClick={handlePreviewClose}
      ref={ref}
    >
      <img src={`assets/${currentCar}`} />
    </div>
  );
};
