import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UseGlobalContext } from '../context';

import moon from '../assets/images/moon_map.jpeg';

// interface

interface aroundPlanet {
  rel: string;
  planet: string;
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

interface Props {
  rel: string;
}
const Moons: React.FC = () => {
  const { ID1, ID2, addToRef, showSection } = UseGlobalContext();
  const [singleMoon, setSingleMoon] = useState({} as singleBody);
  const [loading, setLoading] = useState(true);
  const moon = useLocation();
  const moonRel = moon.state;

  const getSingleMoon = async () => {
    setLoading(true);

    try {
      if (typeof moonRel === 'string') {
        const response = await axios.get(moonRel);
        const data = response.data;
        setSingleMoon(data);
        setLoading(false);
        console.log(data);
      }

      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleMoon();
  }, [moonRel]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Wrapper>
      <div className='single-body'>
        <div
          className={singleMoon.name === 'La Lune' ? 'moon' : 'not-moon'}
        ></div>
      </div>
      <h1>{singleMoon.name}</h1>
      <Link to={`/planet/${singleMoon.aroundPlanet.planet}`}>
        {singleMoon.aroundPlanet.planet === 'terre'
          ? 'Earth'
          : singleMoon.aroundPlanet.planet}
      </Link>
      {singleMoon.bodyType && <p>bodyType: {singleMoon.bodyType}</p>}
      <div className='section-options'>
        <button onClick={showSection} className='option-btn' data-id={ID1}>
          One
        </button>
        <button onClick={showSection} className='option-btn' data-id={ID2}>
          Two
        </button>
      </div>
      <div className='section-wrapper'>
        <section
          className='section-container'
          style={{ display: 'flex' }}
          ref={addToRef}
          data-id={ID1}
        >
          <h1>{singleMoon.meanRadius.toString().slice(0, 2)}</h1>
          <p>{singleMoon.eccentricity}</p>
          {singleMoon.meanRadius && <p>Radius: {singleMoon.meanRadius}</p>}
          {singleMoon.mass && singleMoon.mass.massValue > 0 && (
            <p>Mass Value: {singleMoon.mass.massValue}</p>
          )}
          {singleMoon.vol && singleMoon.vol.volValue > 0 && (
            <p>Vol Value: {singleMoon.vol.volValue}</p>
          )}
          {singleMoon.density > 0 && <p>Density: {singleMoon.density}</p>}
          {singleMoon.gravity > 0 && <p>Gravity: {singleMoon.gravity}</p>}
          {singleMoon.escape > 0 && <p>Escape: {singleMoon.escape}</p>}

          {singleMoon.equaRadius > 0 && (
            <p>equaRadius: {singleMoon.equaRadius}</p>
          )}
        </section>
        <section className='section-container' ref={addToRef} data-id={ID2}>
          {singleMoon.polarRadius > 0 && (
            <p>polarRadius: {singleMoon.polarRadius}</p>
          )}
          {singleMoon.flattening > 0 && (
            <p>flattening: {singleMoon.flattening}</p>
          )}
          {singleMoon.dimension > 0 && <p>dimension: {singleMoon.dimension}</p>}
          {singleMoon.sideralOrbit > 0 && (
            <p>sideralOrbit: {singleMoon.sideralOrbit}</p>
          )}
          {singleMoon.sideralRotation > 0 && (
            <p>sideralRotation: {singleMoon.sideralRotation}</p>
          )}
          {singleMoon.discoveryDate && (
            <p>discoveryDate: {singleMoon.discoveryDate}</p>
          )}
          {singleMoon.discoveredBy && (
            <p>discoveredBy: {singleMoon.discoveredBy}</p>
          )}
          {singleMoon.alternativeName && (
            <p>alternativeName: {singleMoon.alternativeName}</p>
          )}
          {singleMoon.axialTilt > 0 && <p>axialTilt: {singleMoon.axialTilt}</p>}
          {singleMoon.avgTemp > 0 && <p>avgTemp: {singleMoon.avgTemp}</p>}
          {singleMoon.mainAnomaly > 0 && (
            <p>mainAnomaly: {singleMoon.mainAnomaly}</p>
          )}
          {singleMoon.argPeriapsis > 0 && (
            <p>argPeriapsis: {singleMoon.argPeriapsis}</p>
          )}
          {singleMoon.longAscNode > 0 && (
            <p>longAscNode: {singleMoon.longAscNode}</p>
          )}
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
  .moon {
    background: url('${moon}');
  }
  .not-moon {
    background: radial-gradient(circle at 100px 100px, #5cabff, #000);
  }

  @keyframes spin {
    to {
      transform: translateX(-50%);
    }
  }
`;

export default Moons;
