// import "../app.css";
import { DB } from "./DB";
import React, { useEffect, useState } from "react";
import Stub from "../assets/stub.jpg";

export const Welcome = () => {
  console.log(1);
  const [currentType, setCurrentType] = useState("all");
  const [currentOrigin, setCurrentOrigin] = useState("all");
  const [filteredDB, setFilteredDB] = useState<typeof DB>([]);
  const [garage, setGarage] = useState<typeof DB>([]);
  const [origins, setOrigins] = useState([""]);
  const [inputValue, setInputValue] = useState("");

  const buttons = [
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

  const handleFilterType: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setCurrentType(event.currentTarget.id);
    filterDB(event.currentTarget.id, currentOrigin);
  };

  const handleFilterOrigin: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    setCurrentOrigin(event.currentTarget.id);
    filterDB(currentType, event.currentTarget.id);
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
      <h1>Hot Wheels Гараж</h1>
      <div className="settings">
        {origins.map((origin) => (
          <div
            key={origin}
            id={origin}
            className={`button ${currentOrigin === origin && "button--active"}`}
            onClick={handleFilterOrigin}
          >
            {origin}
          </div>
        ))}
        <div
          key="all"
          id="all"
          className={`button ${currentOrigin === "all" && "button--active"}`}
          onClick={handleFilterOrigin}
        >
          Все
        </div>
      </div>
      <div className="settings">
        {buttons.map((button) => (
          <div
            key={button.type}
            className={`button ${
              currentType === button.type && "button--active"
            }`}
            id={button.type}
            onClick={handleFilterType}
          >
            {button.title}
          </div>
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
      <div className="cars">
        {garage.map(
          (car, index) =>
            car.title && (
              <div
                className="card"
                style={{
                  backgroundImage: car.image
                    ? `url('/app/assets/${car.image}')`
                    : `url('${Stub}')`,
                }}
              >
                <p key={car.title} className="car-title">
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
