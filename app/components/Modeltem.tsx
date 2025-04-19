import React from "react";
import type { Model } from "./types";
import Stub from "../assets/stub.jpg";

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
  if (!model.title) {
    return null;
  }
  return (
    <div
      className="card cursor-pointer"
      style={{
        backgroundImage: model.image
          ? `url('assets/${model.image}')`
          : `url('${Stub}')`,
      }}
      onClick={(event) => handleModelClick(event, model.image)}
      role="button"
    >
      <p
        key={model.title}
        className="model-title cursor-text text-sm"
        onClick={(event) => event.stopPropagation()}
      >
        {index + 1}. {model.series ? `${model.series}: ` : ""}
        {model.title}
      </p>
    </div>
  );
};
