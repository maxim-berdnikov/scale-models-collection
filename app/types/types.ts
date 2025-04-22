export type Model = {
  title: string;
  type: string;
  scale: string;
  origin: string;
  treasureHunt?: boolean;
  series?: string;
  order?: string;
  year?: number;
  mainMaterial?: string;
  image?: string;
};

export type ConstructorOrigin = "lego" | "lele" | "Brick Labs" | "Rubrick";

export enum SetType {
  SET = "set",
  MINIFIGURE = "minifigure",
  POLIBAG = "polibag",
}

export type Constructor = {
  title: string;
  image?: string;
  id: number | string;
  series?: string[];
  count?: number;
  type?: SetType;
  origin: ConstructorOrigin;
};
