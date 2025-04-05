import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const DB = [
  {
    title: "Cadet",
    type: "car",
    scale: "1:64",
    origin: "Zuru",
    treasureHunt: false,
    series: "Metal Machines",
    order: "",
    year: 0,
    mainMaterial: "metal"
  },
  {
    title: "Batman: The Animated Series",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "5/5",
    year: 0,
    mainMaterial: "metal",
    image: "31.jpg"
  },
  {
    title: "Mazda Repu",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Hot Trucks",
    order: "2/10",
    year: 0,
    mainMaterial: "metal"
  },
  {
    title: "'73 BMW 3.0 CLS Race Car",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Retro Racers",
    order: "2/10",
    year: 2021,
    mainMaterial: "metal"
  },
  {
    title: "Time Shifter",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Metro",
    order: "2/10",
    year: 2021,
    mainMaterial: "metal",
    image: "17.jpg"
  },
  {
    title: "'70 Chevy Chevelle",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Contored",
    order: "3/5",
    year: 0,
    mainMaterial: "metal",
    image: "18.jpg"
  },
  {
    title: "'87 Ford Sierra Cosworth",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Retro Racers",
    order: "1/10",
    year: 2022,
    mainMaterial: "metal"
  },
  {
    title: "'84 Mustang SVO",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW: The '80s",
    order: "2/10",
    year: 2022,
    mainMaterial: "metal"
  },
  {
    title: "'49 Ford F1",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Pro Squad",
    order: "5/10",
    year: 2019,
    mainMaterial: "metal",
    image: "35.jpg"
  },
  {
    title: "Mod Rod",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Dream Garage",
    order: "5/10",
    year: 2019,
    mainMaterial: "metal",
    image: "32.jpg"
  },
  {
    title: "Circle Tracker",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Race day",
    order: "6/10",
    year: 2019,
    mainMaterial: "metal",
    image: "36.jpg"
  },
  {
    title: "Snoopi",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Screen Time",
    order: "5/10",
    year: 2018,
    mainMaterial: "metal",
    image: "19.webp"
  },
  {
    title: "Paty Wagon (TMNT)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Screen Time",
    order: "3/10",
    year: 2020,
    mainMaterial: "metal",
    image: "20.jpg"
  },
  {
    title: "'52 Hudson Hornet (Purple)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Pro Squad",
    order: "4/10",
    year: 2020,
    mainMaterial: "metal",
    image: "21.jpg"
  },
  {
    title: "'73 Ford Falcon XB (Green)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Flames",
    order: "7/10",
    year: 2020,
    mainMaterial: "metal",
    image: "22.jpg"
  },
  {
    title: "'71 Plymouth GTX",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Muscle Mania",
    order: "7/10",
    year: 2023,
    mainMaterial: "metal",
    image: "33.webp"
  },
  {
    title: "'55 Chevy Bel Air Gasser (Purple)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Chevy Bel Air",
    order: "2/5",
    year: 2022,
    mainMaterial: "metal",
    image: "23.jpg"
  },
  {
    title: "Arkham Asylum Batmobile (Blue)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: true,
    series: "Batman",
    order: "5/5",
    year: 2019,
    mainMaterial: "metal",
    image: "24.jpg"
  },
  {
    title: "Arkham Asylum Batmobile (Green)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "2/5",
    year: 2020,
    mainMaterial: "metal",
    image: "25.jpg"
  },
  {
    title: "The Batman Batmobile (Blue)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "2/5",
    year: 2020,
    mainMaterial: "metal",
    image: "26.jpg"
  },
  {
    title: "Batmobile (Chrome)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "3/5",
    year: 2020,
    mainMaterial: "metal",
    image: "27.jpg"
  },
  {
    title: "Arkham Knight Batmobile (Red)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "1/5",
    year: 2020,
    mainMaterial: "metal",
    image: "28.jpg"
  },
  {
    title: "Batman 2022 Batmobile",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "DC Character Cars",
    order: "",
    year: 2022,
    mainMaterial: "metal",
    image: "29.jpg"
  },
  {
    title: "Batplane (Black)",
    type: "plane",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "1/5",
    year: 2020,
    mainMaterial: "metal",
    image: "30.jpg"
  },
  {
    title: "'10 Pro Stock Camaro",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Speed Graphics",
    order: "5/10",
    year: 2018,
    mainMaterial: "metal"
  },
  {
    title: "Porsche 934 Turbo RSR",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Forza Motorsport",
    order: "5/5",
    year: 2020,
    mainMaterial: "metal",
    image: "16.jpg"
  },
  {
    title: "Ford Shelby GT350",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Forza Motorsport",
    order: "4/5",
    year: 2020,
    mainMaterial: "metal",
    image: "15.webp"
  },
  {
    title: "X-Jet (Blue)",
    type: "plane",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Screen Time",
    order: "10/10",
    year: 2021,
    mainMaterial: "metal",
    image: "14.jpg"
  },
  {
    title: "X-Jet (Black)",
    type: "plane",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Screen Time",
    order: "4/40",
    year: 2021,
    mainMaterial: "metal",
    image: "13.jpg"
  },
  {
    title: "Tricera-Truck (Teal)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Dino Reders",
    order: "3/5",
    year: 2021,
    mainMaterial: "metal",
    image: "12.jpg"
  },
  {
    title: "Volkswagen Beetle (Green)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Compact Kings",
    order: "2/5",
    year: 2022,
    mainMaterial: "metal",
    image: "11.jpg"
  },
  {
    title: "'55 Chevy (Red)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Chevy Bel Air",
    order: "1/5",
    year: 2022,
    mainMaterial: "metal",
    image: "37.jpg"
  },
  {
    title: "TV Series Batmobile",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Batman",
    order: "4/5",
    year: 2022,
    mainMaterial: "metal"
  },
  {
    title: "Jeep Wrangler",
    type: "car",
    scale: "1:34-1:39",
    origin: "Welly",
    treasureHunt: false,
    series: "",
    order: "#8890",
    year: 0,
    mainMaterial: "metal"
  },
  {
    title: "Mercedes-Benz CLK-GTR",
    type: "car",
    scale: "1:34-1:39",
    origin: "Welly",
    treasureHunt: false,
    series: "",
    order: "#9746",
    year: 0,
    mainMaterial: "metal",
    image: "39.jpg"
  },
  {
    title: "Chrysler Crossfire",
    type: "car",
    scale: "1:43",
    origin: "Max Motor",
    treasureHunt: false,
    series: "",
    order: "#4046",
    year: 2003,
    mainMaterial: "metal",
    image: "40.jpg"
  },
  {
    title: "Ford Mustang 1999",
    type: "car",
    scale: "1:34-1:39",
    origin: "Welly",
    treasureHunt: false,
    series: "",
    order: "#9753",
    year: 0,
    mainMaterial: "metal",
    image: "38.webp"
  },
  {
    title: "Roadbeasts McDonald's",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2003,
    mainMaterial: "metal",
    image: "10.png"
  },
  {
    title: "'17 Acura NSX",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Forza Motorsport",
    order: "2/5",
    year: 2020,
    mainMaterial: "metal",
    image: "9.webp"
  },
  {
    title: "Pink 5",
    type: "car",
    scale: "1:64",
    origin: "China",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2e3,
    mainMaterial: "metal"
  },
  {
    title: "Police Car",
    type: "car",
    scale: "1:64",
    origin: "China",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2e3,
    mainMaterial: "plastic"
  },
  {
    title: "Cargo Car",
    type: "car",
    scale: "1:64",
    origin: "China",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2e3,
    mainMaterial: "metal"
  },
  {
    title: "Ford Mustang Mach-E 140",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Green Speed",
    order: "1/5",
    year: 2021,
    mainMaterial: "metal",
    image: "34.jpg"
  },
  {
    title: "McLaren F1 GTR",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Retro Racers",
    order: "3/10",
    year: 2021,
    mainMaterial: "metal",
    image: "8.webp"
  },
  {
    title: "'57 Chevy",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Chevy Bel Air",
    order: "3/5",
    year: 2021,
    mainMaterial: "metal"
  },
  {
    title: "Subaru WRX STI",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW Hatchbacks",
    order: "4/5",
    year: 2021,
    mainMaterial: "metal"
  },
  {
    title: "Nissan Skyline GT-R (R32)",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "J-Imports",
    order: "5/10",
    year: 2021,
    mainMaterial: "metal",
    image: "7.webp"
  },
  {
    title: "'32 Ford",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "Retro Racers",
    order: "2/10",
    year: 2021,
    mainMaterial: "metal",
    image: "6.jpg"
  },
  {
    title: "'83 Chevy Silverado",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "",
    order: "1/5",
    year: 2025,
    mainMaterial: "metal",
    image: "2.jpg"
  },
  {
    title: "Purple Passion",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2025,
    mainMaterial: "metal",
    image: "5.webp"
  },
  {
    title: "'57 GMC Stepside",
    type: "car",
    scale: "1:64",
    origin: "Match Box",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2025,
    mainMaterial: "metal",
    image: "1.jpg"
  },
  {
    title: "'82 Toyota Supra ",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "HW: The '80s",
    order: "10/10",
    year: 2024,
    mainMaterial: "metal",
    image: "3.webp"
  },
  {
    title: "1978 Dodge Li'l Red Express Truck",
    type: "car",
    scale: "1:64",
    origin: "Hot Wheels",
    treasureHunt: false,
    series: "",
    order: "",
    year: 2024,
    mainMaterial: "metal",
    image: "4.webp"
  }
];
const Stub = "/assets/stub-Cu8DKNcu.jpg";
const Welcome = () => {
  console.log(1);
  const [currentType, setCurrentType] = useState("all");
  const [currentOrigin, setCurrentOrigin] = useState("all");
  const [filteredDB, setFilteredDB] = useState([]);
  const [garage, setGarage] = useState([]);
  const [origins, setOrigins] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  const [currentCar, setCurrentCar] = useState("");
  const buttons = [
    {
      type: "car",
      title: "Машины"
    },
    {
      type: "plane",
      title: "Самолеты"
    },
    {
      type: "all",
      title: "Все"
    }
  ];
  const filterDB = (type, origin) => {
    const filteredByType = type === "all" ? filteredDB : filteredDB.filter((car) => car.type === type);
    const filteredByOrigin = origin === "all" ? filteredByType : filteredByType.filter((car) => car.origin === origin);
    setGarage(filteredByOrigin);
  };
  const handleFilterType = (event) => {
    setCurrentType(event.currentTarget.id);
    filterDB(event.currentTarget.id, currentOrigin);
  };
  const handleFilterOrigin = (event) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "App", children: [
    currentCar && /* @__PURE__ */ jsx(
      "img",
      {
        src: `app/assets/${currentCar}`,
        className: "fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[500px] cursor-crosshair",
        onClick: () => setCurrentCar("")
      }
    ),
    /* @__PURE__ */ jsx("h1", { children: "Hot Wheels Гараж" }),
    /* @__PURE__ */ jsxs("div", { className: "settings", children: [
      origins.map((origin) => /* @__PURE__ */ jsx(
        "button",
        {
          id: origin,
          className: `button ${currentOrigin === origin && "button--active"}`,
          onClick: handleFilterOrigin,
          children: origin
        },
        origin
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          id: "all",
          className: `button ${currentOrigin === "all" && "button--active"}`,
          onClick: handleFilterOrigin,
          children: "Все"
        },
        "all"
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "settings", children: buttons.map((button) => /* @__PURE__ */ jsx(
      "button",
      {
        className: `button ${currentType === button.type && "button--active"}`,
        id: button.type,
        onClick: handleFilterType,
        children: button.title
      },
      button.type
    )) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Всего: ",
      garage.length
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        value: inputValue,
        onChange: (event) => {
          setInputValue(event.currentTarget.value);
          const list = event.target.value ? filteredDB.filter(
            (item) => item.title.toLowerCase().includes(event.target.value.toLowerCase())
          ) : filteredDB;
          setGarage(list);
        },
        className: "input"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "cars", children: garage.map(
      (car, index) => car.title && /* @__PURE__ */ jsx(
        "div",
        {
          className: "card cursor-pointer",
          style: {
            backgroundImage: car.image ? `url('app/assets/${car.image}')` : `url('${Stub}')`
          },
          onClick: () => {
            if (car.image) {
              setCurrentCar(car.image);
            }
          },
          role: "button",
          children: /* @__PURE__ */ jsxs(
            "p",
            {
              className: "car-title cursor-text text-sm",
              onClick: (event) => event.stopPropagation(),
              children: [
                index + 1,
                ". ",
                car.series ? `${car.series}: ` : "",
                car.title
              ]
            },
            car.title
          )
        }
      )
    ) })
  ] });
};
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Ks5PdKEw.js", "imports": ["/assets/chunk-GNGMS2XR-Dos2DHKy.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-n9KBXhLx.js", "imports": ["/assets/chunk-GNGMS2XR-Dos2DHKy.js", "/assets/with-props-CmJzUyz8.js"], "css": ["/assets/root-wh8pGmKm.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-BZPHDnYC.js", "imports": ["/assets/with-props-CmJzUyz8.js", "/assets/chunk-GNGMS2XR-Dos2DHKy.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-6fea6605.js", "version": "6fea6605" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
