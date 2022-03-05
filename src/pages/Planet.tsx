import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// edit interface
interface NewPlanet {
  name: string;
  meanRadius: number;
  moons: Array<string>;
}
const Planet: React.FC = () => {
  const [singlePlanet, setSinglePlanet] = useState({} as NewPlanet);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const getSinglePlanet = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.le-systeme-solaire.net/rest/bodies/${id}`
      );
      const data = response.data;
      setSinglePlanet(data);
      setLoading(false);

      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSinglePlanet();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>{singlePlanet.name}</h1>
      <h1>{singlePlanet.meanRadius}</h1>
      <h1>{singlePlanet.meanRadius.toString().slice(0, 2)}</h1>
      {/* {singlePlanet.moons &&
        singlePlanet.moons.map((moon) => {
          return <h1>{moon.moon}</h1>;
        })} */}
    </>
  );
};

export default Planet;
