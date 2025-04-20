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
    <div className="fixed left-0 bottom-2.5 w-full flex justify-center z-1">
      <div className="origins-container flex justify-start gap-[10px] overflow-x-auto w-fit max-w-[95%] h-[30px]">
        <Button
          origin={"all"}
          currentOrigin={currentOrigin}
          handleFilterOrigin={handleFilterOrigin}
        />
        {origins.map((origin) => (
          <Button
            key={origin}
            origin={origin}
            currentOrigin={currentOrigin}
            handleFilterOrigin={handleFilterOrigin}
          />
        ))}
      </div>
    </div>
  );
};
