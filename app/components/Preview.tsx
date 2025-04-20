import React from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

type PreviewProps = {
  currentModel: string;
  setCurrentModel: React.Dispatch<React.SetStateAction<string>>;
};

export const Preview: React.FC<PreviewProps> = ({
  currentModel,
  setCurrentModel,
}) => {
  const handlePreviewClose = () => {
    setCurrentModel("");
    document.body.classList.remove("overflow-y-hidden");
  };

  const ref = useOutsideClick<HTMLImageElement>(handlePreviewClose);

  if (!currentModel) {
    return null;
  }

  return (
    <div
      className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[500px] cursor-zoom-out width w-[90%] overflow-hidden flex justify-center z-1"
      onClick={handlePreviewClose}
      ref={ref}
    >
      <img src={`assets/${currentModel}`} className="rounded-[20px]" />
    </div>
  );
};
