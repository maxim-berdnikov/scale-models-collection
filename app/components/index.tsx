import { DB } from "./DB";
import React, { useEffect, useState } from "react";
import type { Model } from "./types";
import { Preview } from "./Preview";
import { Modeltem } from "./Modeltem";
import { BUTTONS } from "./const";
import { Origins } from "./Origins";

export const MainPage = () => {
  const [currentType, setCurrentType] = useState("all");
  const [currentOrigin, setCurrentOrigin] = useState("all");
  const [filteredDB, setFilteredDB] = useState<Model[]>([]);
  const [garage, setGarage] = useState<Model[]>([]);
  const [origins, setOrigins] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  const [currentModel, setCurrentModel] = useState("");

  const filterDB = (type: string, origin: string) => {
    const filteredByType =
      type === "all"
        ? filteredDB
        : filteredDB.filter((model) => model.type === type);

    const filteredByOrigin =
      origin === "all"
        ? filteredByType
        : filteredByType.filter((model) => model.origin === origin);

    setGarage(filteredByOrigin);
  };

  const handleFilterType: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setCurrentType(event.currentTarget.id);
    filterDB(event.currentTarget.id, currentOrigin);
  };

  const handleFilterOrigin: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setCurrentOrigin(event.currentTarget.id);
    filterDB(currentType, event.currentTarget.id);
  };

  const handleModelClick = (
    event: React.MouseEvent,
    modelImage: string | undefined
  ) => {
    event.stopPropagation();

    if (modelImage) {
      setCurrentModel(modelImage === currentModel ? "" : modelImage);
    }
  };

  useEffect(() => {
    const newDB = DB.filter((model) => model.title).sort((a, b) => {
      const titleA = `${a.series}: ${a.title}`;
      const titleB = `${b.series}: ${b.title}`;

      return titleA.localeCompare(titleB);
    });
    setFilteredDB(newDB);
    setGarage(newDB);

    const allOrigins = DB.filter((model) => model.origin).map(
      (model) => model.origin
    );

    setOrigins([...new Set(allOrigins)]);
  }, []);

  return (
    <div className="mx-auto my-auto mt-0 mb-0 text-center bg-[#000000cc] text-white h-full">
      <Preview currentModel={currentModel} setCurrentModel={setCurrentModel} />
      <h1 className="pb-2.5 text-lg font-bold">Scale Models Collection</h1>
      <Origins
        origins={origins}
        currentOrigin={currentOrigin}
        handleFilterOrigin={handleFilterOrigin}
      />
      <div className="mb-[10px] flex justify-center gap-[10px] flex-wrap">
        {BUTTONS.map((button) => (
          <button
            key={button.type}
            className={`button button--type ${
              currentType === button.type && "button--active"
            }`}
            id={button.type}
            onClick={handleFilterType}
          >
            {button.title}
          </button>
        ))}
      </div>
      <p>Всего: {garage.length}</p>
      <input
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.currentTarget.value);

          const list = event.target.value
            ? filteredDB.filter((item) =>
                item.title
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
            : filteredDB;

          setGarage(list);
        }}
        className="input"
      />
      <div className={"models"}>
        {garage.map((model, index) => (
          <Modeltem
            key={`${model.series || ""}-${model.title}`}
            model={model}
            index={index}
            handleModelClick={handleModelClick}
          />
        ))}
      </div>
    </div>
  );
};
