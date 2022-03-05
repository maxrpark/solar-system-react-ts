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
  scale: boolean;
  speed: boolean;
}
const AppContext = React.createContext({} as ContextState);

const AppProvider: React.FC = ({ children }) => {
  const [solarSistem, setSolarSistem] = useState<singleBody[]>([]);
  const [scale, setScale] = useState(false);
  const [speed, setSpeed] = useState(true);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{ solarSistem, scale, speed, controlSpeed, controlSize }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const UseGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
