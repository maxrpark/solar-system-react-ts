import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import sun from '../assets/images/sun.jpeg';
import mercurio from '../assets/images/mercurio.jpeg';
import venus from '../assets/images/venus.jpeg';
import earth from '../assets/images/earth.webp';
import mars from '../assets/images/mars.webp';
import jupiter from '../assets/images/jupiter.jpeg';
import saturn from '../assets/images/saturn.webp';
import uranus from '../assets/images/uranus.png';
import neptune from '../assets/images/neptune.jpeg';

// interface

interface Moons {
  moon: string;
  rel: string;
}
interface singleBody {
  name: string;
  englishName: string;
  meanRadius: number;
  moons: Moons[];
}
const Planet: React.FC = () => {
  const [singlePlanet, setSinglePlanet] = useState({} as singleBody);
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
  }, [id]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Wrapper key={singlePlanet.name}>
      <div className='single-body'>
        <div className={`${singlePlanet.englishName.toLowerCase()}`}></div>
      </div>
      <h1>{singlePlanet.name}</h1>
      <h1>{singlePlanet.meanRadius}</h1>
      <h1>{singlePlanet.meanRadius.toString().slice(0, 2)}</h1>
      {singlePlanet.moons &&
        singlePlanet.moons.map((moon) => {
          return <h1 key={moon.moon}>{moon.moon}</h1>;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .single-body {
    width: 300px;
    height: 300px;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 20px 20px #000 inset, 0 0 20px 2px #000;
  }

  .single-body:after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: -20px -20px 50px 2px #000 inset;
    border-radius: 50%;
  }

  .single-body > div {
    width: 200%;
    height: 100%;
    animation: spin 30s linear alternate infinite;
    background-size: cover;
  }

  .sun {
    background: url('${sun}');
  }
  .mercury {
    background: url('${mercurio}');
  }
  .venus {
    background: url('${venus}');
  }
  .earth {
    background: url('${earth}');
  }
  .mars {
    background: url('${mars}');
  }

  .jupiter {
    background: url('${jupiter}');
  }
  .saturn {
    background: url('${saturn}');
  }
  .uranus {
    background: url('${uranus}');
  }
  .neptune {
    background: url('${neptune}');
  }
  @keyframes spin {
    to {
      transform: translateX(-50%);
    }
  }
`;

export default Planet;
