import { DB } from "./DB";
import React, { useEffect, useState } from "react";
import Stub from "../assets/stub.jpg";
import type { Car } from "./types";
import { Preview } from "./Preview";
import classNames from "classnames";

const BUTTONS = [
  {
    type: "car",
    title: "Машины",
  },
  {
    type: "plane",
    title: "Самолеты",
  },
  {
    type: "all",
    title: "Все",
  },
];

export const MainPage = () => {
  const [currentType, setCurrentType] = useState("all");
  const [currentOrigin, setCurrentOrigin] = useState("all");
  const [filteredDB, setFilteredDB] = useState<Car[]>([]);
  const [garage, setGarage] = useState<Car[]>([]);
  const [origins, setOrigins] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  const [currentCar, setCurrentCar] = useState("");

  const filterDB = (type: string, origin: string) => {
    const filteredByType =
      type === "all"
        ? filteredDB
        : filteredDB.filter((car) => car.type === type);

    const filteredByOrigin =
      origin === "all"
        ? filteredByType
        : filteredByType.filter((car) => car.origin === origin);

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
    carImage: string | undefined
  ) => {
    if (carImage) {
      event.stopPropagation();
      setCurrentCar(carImage === currentCar ? "" : carImage);
    }
  };

  useEffect(() => {
    const newDB = DB.filter((car) => car.title).sort((a, b) => {
      const titleA = `${a.series}: ${a.title}`;
      const titleB = `${b.series}: ${b.title}`;

      return titleA.localeCompare(titleB);
    });
    setFilteredDB(newDB);
    setGarage(newDB);

    const allOrigins = DB.filter((car) => car.origin).map((car) => car.origin);

    setOrigins([...new Set(allOrigins)]);
  }, []);

  return (
    <div className="App">
      <Preview currentCar={currentCar} setCurrentCar={setCurrentCar} />
      <h1>Hot Wheels Гараж</h1>
      <div className="mb-[10px] flex justify-center gap-[10px] flex-wrap">
        {origins.map((origin) => (
          <button
            key={origin}
            id={origin}
            className={`button ${
              currentOrigin === origin && "button--active"
            } shrink-0`}
            onClick={handleFilterOrigin}
          >
            {origin}
          </button>
        ))}
        <button
          key="all"
          id="all"
          className={`button ${
            currentOrigin === "all" && "button--active"
          } shrink-0`}
          onClick={handleFilterOrigin}
        >
          Все
        </button>
      </div>
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
      <div className={"cars"}>
        {garage.map(
          (car, index) =>
            car.title && (
              <div
                className="card cursor-pointer"
                style={{
                  backgroundImage: car.image
                    ? `url('assets/${car.image}')`
                    : `url('${Stub}')`,
                }}
                onClick={(event) => handleModelClick(event, car.image)}
                role="button"
              >
                <p
                  key={car.title}
                  className="car-title cursor-text text-sm"
                  onClick={(event) => event.stopPropagation()}
                >
                  {index + 1}. {car.series ? `${car.series}: ` : ""}
                  {car.title}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
};
