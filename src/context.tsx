import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';

import axios from 'axios';

interface singleBody {
  id: string;
  name: string;
  meanRadius: number;
  isPlanet: boolean;
  englishName: string;
}

interface ContextState {
  solarSistem: Array<singleBody>;
  controlSpeed: () => void;
  controlSize: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  addToRef: (ref: HTMLElement) => void;
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
  const [BTNID, setBTNID] = useState(1);
  const [ID1, setID1] = useState(1);
  const [ID2, setID2] = useState(2);
  const [ID3, setID3] = useState(3);

  // asyn axios  function
  const getData = async () => {
    try {
      const response = await axios.get(
        'https://api.le-systeme-solaire.net/rest/bodies/'
      );
      const data = response.data.bodies;
      const planetsListName: Array<string> = [];
      if (data.length) {
        const allBodies = Array();
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

  const sectionRef = useRef<HTMLElement[]>([]);
  sectionRef.current = [];

  const addToRef = (el: HTMLElement) => {
    if (el && !sectionRef.current.includes(el)) {
      sectionRef.current.push(el);
    }
  };

  const showSection = (e: any) => {
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
        controlSpeed,
        controlSize,
        openSidebar,
        closeSidebar,
        addToRef,
        showSection,
        ID1,
        ID2,
        ID3,
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
