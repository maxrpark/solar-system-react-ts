import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import sun from '../assets/images/sun.jpeg';
import mercurio from '../assets/images/mercurio.jpeg';
import venus from '../assets/images/venus.jpeg';
import earth from '../assets/images/earth.jpeg';
import mars from '../assets/images/mars.webp';
import jupiter from '../assets/images/jupiter.jpeg';
import saturn from '../assets/images/saturn.webp';
import uranus from '../assets/images/uranus.png';
import neptune from '../assets/images/neptune.jpeg';

import { UseGlobalContext } from '../context';

// interface

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
interface singleBody {
  name: string;
  englishName: string;
  meanRadius: number;
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
  aroundPlanet: boolean;
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
const Planet: React.FC = () => {
  const { ID1, ID2, ID3, addToRef, showSection } = UseGlobalContext();
  const [singlePlanet, setSinglePlanet] = useState({} as singleBody);
  const [loading, setLoading] = useState(true);

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
      <h1>
        Name: {singlePlanet.name === 'La Terre' ? 'Earth' : singlePlanet.name}
      </h1>
      <p>Type: {singlePlanet.bodyType}</p>

      <div className='section-options'>
        <button onClick={showSection} className='option-btn' data-id={ID1}>
          One
        </button>
        <button onClick={showSection} className='option-btn' data-id={ID2}>
          Two
        </button>
        {singlePlanet.moons && (
          <button onClick={showSection} className='option-btn' data-id={ID3}>
            Three
          </button>
        )}
      </div>
      <div className='section-wrapper'>
        <section
          className='section-container'
          style={{ display: 'flex' }}
          ref={addToRef}
          data-id={ID1}
        >
          <h1>Radius: {singlePlanet.meanRadius}</h1>
          <h1>{singlePlanet.meanRadius.toString().slice(0, 2)}</h1>
          <p>Centricity: {singlePlanet.eccentricity}</p>
          <p>Mass: {singlePlanet.mass.massValue}</p>
          <p>Vol: {singlePlanet.vol.volValue}</p>
          <p>Density: {singlePlanet.density}</p>
          <p>Gravity: {singlePlanet.gravity}</p>
          {singlePlanet.dimension > 0 && (
            <p>Dimension: {singlePlanet.dimension}</p>
          )}
          <p>Discovered By: {singlePlanet.discoveredBy}</p>
          <p>Alternative name: {singlePlanet.alternativeName}</p>
        </section>
        <section className='section-container' ref={addToRef} data-id={ID2}>
          <p>Escape: {singlePlanet.escape}</p>
          <p>Equa Radius: {singlePlanet.equaRadius}</p>
          <p>Polar Radius: {singlePlanet.polarRadius}</p>
          <p>Flattening: {singlePlanet.flattening}</p>
          <p>Sideral Orbit: {singlePlanet.sideralOrbit}</p>
          <p>Sideral Rotation: {singlePlanet.sideralRotation}</p>
          <p>Around Planet: {singlePlanet.aroundPlanet}</p>
          <p>Discovery Date: {singlePlanet.discoveryDate}</p>
          <p>Axial Titl: {singlePlanet.axialTilt}</p>
          <p>Avg Temp: {singlePlanet.avgTemp}</p>
          <p>Main Anomaly: {singlePlanet.mainAnomaly}</p>
          <p>Arg Periapsis: {singlePlanet.argPeriapsis}</p>
          <p>longAscNode: {singlePlanet.longAscNode}</p>
        </section>
        <section
          className='section-container section-moons'
          ref={addToRef}
          data-id={ID3}
        >
          <div className='moons-container'>
            {singlePlanet.moons &&
              singlePlanet.moons.map((moon) => {
                return (
                  <Link key={moon.moon} to={`/moons/`} state={moon.rel}>
                    {moon.moon}
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
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
  /* .moons-container {
    display: flex;
    flex-direction: column;
  } */
`;

export default Planet;
