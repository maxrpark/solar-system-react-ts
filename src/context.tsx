import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';

import axios from 'axios';

interface aroundPlanet {
  rel: string;
  planet: string;
}
interface Moons {
  moon: string;
  rel: string;
}

interface Vol {
  volValue: number;
  volExponent: number;
}

interface Mass {
  massValue: number;
  massExponent: number;
}
export interface singleBody {
  id: string;
  name: string;
  meanRadius: number;
  isPlanet: boolean;
  englishName: string;
  moons: Moons[];
  eccentricity: number;
  mass: Mass;
  vol: Vol;
  density: number;
  gravity: number;
  escape: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimension: number;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet: aroundPlanet;
  discoveredBy: string;
  discoveryDate: string;
  alternativeName: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: string;
}

export interface Props {
  singleBody: singleBody;
}
interface ContextState {
  solarSistem: Array<singleBody>;
  controlSpeed: () => void;
  controlSize: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  addToRef: (ref: HTMLElement) => void;
  addBtnsToRef: (ref: HTMLButtonElement) => void;
  showSection: (e: any) => void;
  scale: boolean;
  speed: boolean;
  isSideBarOpen: boolean;
  planetsNames: Array<string>;
  ID1: number;
  ID2: number;
  ID3: number;
}
const AppContext = React.createContext({} as ContextState);

const AppProvider: React.FC = ({ children }) => {
  const [solarSistem, setSolarSistem] = useState<singleBody[]>([]);
  const [planetsNames, setPlanetsNames] = useState<string[]>([]);
  const [scale, setScale] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [speed, setSpeed] = useState(true);

  const ID1 = 1;
  const ID2 = 2;
  const ID3 = 3;
  // const [ID1, setID1] = useState(1);
  // const [ID2, setID2] = useState(2);
  // const [ID3, setID3] = useState(3);

  const btnRef = useRef<HTMLElement[]>([]);
  btnRef.current = [];

  const sectionRef = useRef<HTMLElement[]>([]);
  sectionRef.current = [];

  const addToRef = (el: HTMLElement) => {
    if (el && !sectionRef.current.includes(el)) {
      sectionRef.current.push(el);
    }
  };

  const addBtnsToRef = (el: HTMLButtonElement) => {
    if (el && !btnRef.current.includes(el)) {
      btnRef.current.push(el);
    }
  };

  // asyn axios  function
  const getData = async () => {
    try {
      const response = await axios.get(
        'https://api.le-systeme-solaire.net/rest/bodies/'
      );
      const data = response.data.bodies;
      const planetsListName: Array<string> = [];
      if (data.length) {
        const allBodies = [];
        const isPlanet = data.filter(
          (item: singleBody) => item.isPlanet === true
        );
        const isSun = data.filter(
          (item: singleBody) => item.englishName === 'Sun'
        );
        allBodies.push(...isSun, ...isPlanet);
        setSolarSistem(allBodies);

        isPlanet.forEach((item: singleBody) => {
          planetsListName.push(item.id);
        });
        setPlanetsNames(planetsListName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const controlSpeed = () => {
    setSpeed(!speed);
  };

  // tyscript void function
  const controlSize = () => {
    setScale(!scale);
  };

  const openSidebar = () => {
    setIsSideBarOpen(true);
  };
  const closeSidebar = () => {
    setIsSideBarOpen(false);
  };

  const showSection = (e: { target: HTMLElement }) => {
    btnRef.current.forEach((btn) => {
      if ((btn as HTMLElement).dataset.id === e.target.dataset.id) {
        (btn as HTMLElement).classList.add('active');
      } else {
        (btn as HTMLElement).classList.remove('active');
      }
    });
    sectionRef.current.forEach((section, idx) => {
      if ((section as HTMLElement).dataset.id === e.target.dataset.id) {
        (section as HTMLElement).style.display = 'flex';
      } else {
        (section as HTMLElement).style.display = 'none';
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        solarSistem,
        scale,
        speed,
        isSideBarOpen,
        planetsNames,
        ID1,
        ID2,
        ID3,
        controlSpeed,
        controlSize,
        openSidebar,
        closeSidebar,
        addToRef,
        showSection,
        addBtnsToRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const UseGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
