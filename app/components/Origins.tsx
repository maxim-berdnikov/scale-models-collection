import React from "react";

type Props = {
  currentOrigin: string;
  handleFilterOrigin: React.MouseEventHandler<HTMLButtonElement>;
};

type OriginsProps = Props & {
  origins: string[];
};

type ButtonProps = Props & {
  origin: string;
};

const Button: React.FC<ButtonProps> = ({
  origin,
  currentOrigin,
  handleFilterOrigin,
}) => (
  <button
    key={origin}
    id={origin}
    className={`button ${
      currentOrigin === origin && "button--active"
    } shrink-0`}
    onClick={handleFilterOrigin}
  >
    {origin === "all" ? "Все" : origin}
  </button>
);

export const Origins: React.FC<OriginsProps> = ({
  origins,
  currentOrigin,
  handleFilterOrigin,
}) => {
  return (
    <div className="fixed left-0 bottom-2.5 w-full flex justify-center">
      <div className="origins-container flex justify-start gap-[10px] overflow-x-auto w-[90%] h-[30px]">
        {origins.map((origin) => (
          <Button
            origin={origin}
            currentOrigin={currentOrigin}
            handleFilterOrigin={handleFilterOrigin}
          />
        ))}
        <Button
          origin={"all"}
          currentOrigin={currentOrigin}
          handleFilterOrigin={handleFilterOrigin}
        />
      </div>
    </div>
  );
};
