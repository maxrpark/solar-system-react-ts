import React from 'react';
import { Link } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import { Props } from '../context';
import styled from 'styled-components';
import { UseGlobalContext } from '../context';

const BodyTitle: React.FC<Props> = ({ singleBody }) => {
  const { setName } = UseGlobalContext();
  return (
    <Wrapper>
      <TypeWriterEffect
        startDelay={100}
        cursorColor='transparent'
        text={`Name: ${setName(singleBody.name)}`}
        typeSpeed={100}
      />

      {singleBody.aroundPlanet && singleBody.aroundPlanet.planet && (
        <Link to={`/planet/${singleBody.aroundPlanet.planet}`}>
          <TypeWriterEffect
            startDelay={100}
            cursorColor='transparent'
            text={`Orbit: ${setName(singleBody.aroundPlanet.planet)}`}
            typeSpeed={100}
          />
          {/* )} */}
        </Link>
      )}

      {singleBody.bodyType && (
        <TypeWriterEffect
          startDelay={100}
          cursorColor='transparent'
          text={`Type: ${singleBody.bodyType}`}
          typeSpeed={100}
        />
      )}
    </Wrapper>
  );
};

export default BodyTitle;

const Wrapper = styled.section`
  p {
    color: white;
    font-size: 1.25rem;
    text-transform: capitalize;
    margin-top: 0.5rem;
  }
`;
