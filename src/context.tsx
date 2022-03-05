import React from 'react';
import { useState, useEffect, useContext } from 'react';

import axios from 'axios';

interface defaultValue {
  solarSistem: any;
}

const AppContext = React.createContext<unknown>(undefined);

const AppProvider: React.FC<{}> = ({ children }) => {
  const [solarSistem, setSolarSistem] = useState<number[]>([]);
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
        const isPlanet = data.filter((item: any) => item.isPlanet === true);
        const isSun = data.filter((item: any) => item.englishName === 'Sun');
        console.log(isSun);
        allBodies.push(...isSun, ...isPlanet);
        setSolarSistem(allBodies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider value={{ solarSistem }}>
      {children}
    </AppContext.Provider>
  );
};
export const UseGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
