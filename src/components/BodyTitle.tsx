import React from 'react';
import { Link } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import { Props } from '../context';

const BodyTitle: React.FC<Props> = ({ singleBody }) => {
  const setName = (name: string) => {
    if (name === 'La Lune') {
      return (name = 'Moon');
    } else if (name === 'Le Soleil') {
      return (name = 'Sun');
    } else if (name === 'La Terre') {
      return (name = 'Earth');
    } else {
      return (name = singleBody.name);
    }
  };
  return (
    <>
      <TypeWriterEffect
        startDelay={100}
        cursorColor='transparent'
        text={`Name: ${setName(singleBody.name)}`}
        typeSpeed={100}
      />

      {singleBody.aroundPlanet && singleBody.aroundPlanet.planet && (
        <Link to={`/planet/${singleBody.aroundPlanet.planet}`}>
          {singleBody.aroundPlanet.planet === 'terre' ? (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Orbit: Earth`}
              typeSpeed={100}
            />
          ) : (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Orbit: ${singleBody.aroundPlanet.planet}`}
              typeSpeed={100}
            />
          )}
        </Link>
      )}

      {singleBody.bodyType && (
        <TypeWriterEffect
          startDelay={100}
          cursorColor='transparent'
          text={`bodyType: ${singleBody.bodyType}`}
          typeSpeed={100}
        />
      )}
    </>
  );
};

export default BodyTitle;
