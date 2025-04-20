import type { Model } from "./types";
import Stub from "../assets/stub.jpg";
import { useState } from "react";
import clsx from "classnames";

type ModeltemProps = {
  model: Model;
  handleModelClick: (
    event: React.MouseEvent,
    modelImage: string | undefined
  ) => void;
  index: number;
};

export const Modeltem: React.FC<ModeltemProps> = ({
  model,
  handleModelClick,
  index,
}) => {
  const [visible, setVisible] = useState(!model.image);

  if (!model.title) {
    return null;
  }

  return (
    <div
      className={clsx(
        "card cursor-pointer relative",
        !model.image && "pointer-events-none"
      )}
      style={{
        backgroundImage: model.image
          ? `url('assets/${model.image}')`
          : `url('${Stub}')`,
      }}
      onClick={(event) => handleModelClick(event, model.image)}
      role="button"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={(event) => {
        event.stopPropagation();
        setVisible(true);
      }}
      onTouchEnd={(event) => {
        event.stopPropagation();
        setVisible(false);
      }}
    >
      <p
        key={model.title}
        className={clsx(
          `model-title m-0 p-[10px] text-left text-white cursor-text text-sm absolute left-0 -bottom-[60px] duration-150 ease-in w-full`,
          visible && "bottom-0"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {index + 1}. {model.series ? `${model.series}: ` : ""}
        {model.title}
      </p>
    </div>
  );
};
