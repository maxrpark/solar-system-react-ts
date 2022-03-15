import React from 'react';
import { useState, useEffect, useContext } from 'react';

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
  scale: boolean;
  speed: boolean;
  isSideBarOpen: boolean;
  planetsNames: Array<string>;
}
const AppContext = React.createContext({} as ContextState);

const AppProvider: React.FC = ({ children }) => {
  const [solarSistem, setSolarSistem] = useState<singleBody[]>([]);
  const [planetsNames, setPlanetsNames] = useState<string[]>([]);
  const [scale, setScale] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [speed, setSpeed] = useState(true);
  // const [planetsName, setPlanetsName] = useState<string[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

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
