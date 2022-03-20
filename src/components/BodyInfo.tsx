import React from 'react';
import { Link } from 'react-router-dom';
import { UseGlobalContext } from '../context';
import TypeWriterEffect from 'react-typewriter-effect';

import { Props } from '../context';

const BodyInfo: React.FC<Props> = ({ singleBody }) => {
  const { ID1, ID2, ID3, addToRef, showSection, addBtnsToRef } =
    UseGlobalContext();
  return (
    <div className='simple-body-info'>
      <div className='section-options'>
        <button onClick={showSection} className='option-btn' data-id={ID1}>
          One
        </button>
        <button onClick={showSection} className='option-btn' data-id={ID2}>
          Two
        </button>
        {singleBody.moons && (
          <button
            ref={addBtnsToRef}
            onClick={showSection}
            className='option-btn'
            data-id={ID3}
          >
            Moons
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
          <span>
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`${singleBody.meanRadius.toString().slice(0, 2)}`}
              typeSpeed={100}
            />
          </span>
          <span>
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`${singleBody.eccentricity}`}
              typeSpeed={100}
            />
          </span>
          {singleBody.meanRadius && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`Radius: ${singleBody.meanRadius}`}
                typeSpeed={100}
              />
            </span>
          )}
          {singleBody.mass && singleBody.mass.massValue > 0 && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`Mass Value: ${singleBody.mass.massValue}`}
                typeSpeed={100}
              />
            </span>
          )}
          {singleBody.vol && singleBody.vol.volValue > 0 && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`Vol Value: ${singleBody.vol.volValue}`}
                typeSpeed={100}
              />
            </span>
          )}
          {singleBody.density > 0 && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`Density: ${singleBody.density}`}
                typeSpeed={100}
              />
            </span>
          )}
          {singleBody.gravity > 0 && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`Gravity: ${singleBody.gravity}`}
                typeSpeed={100}
              />
            </span>
          )}
          {singleBody.escape > 0 && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`Escape: ${singleBody.escape}`}
                typeSpeed={100}
              />
            </span>
          )}

          {singleBody.equaRadius > 0 && (
            <span>
              <TypeWriterEffect
                startDelay={100}
                cursorColor='transparent'
                text={`EquaRadius: ${singleBody.equaRadius}`}
                typeSpeed={100}
              />
            </span>
          )}
        </section>
        <section className='section-container' ref={addToRef} data-id={ID2}>
          {singleBody.polarRadius > 0 && (
            <span>polarRadius: {singleBody.polarRadius}</span>
          )}
          {singleBody.flattening > 0 && (
            <span>flattening: {singleBody.flattening}</span>
          )}
          {singleBody.dimension > 0 && (
            <span>dimension: {singleBody.dimension}</span>
          )}
          {singleBody.sideralOrbit > 0 && (
            <span>sideralOrbit: {singleBody.sideralOrbit}</span>
          )}
          {singleBody.sideralRotation > 0 && (
            <span>sideralRotation: {singleBody.sideralRotation}</span>
          )}
          {singleBody.discoveryDate && (
            <span>discoveryDate: {singleBody.discoveryDate}</span>
          )}
          {singleBody.discoveredBy && (
            <span>discoveredBy: {singleBody.discoveredBy}</span>
          )}
          {singleBody.alternativeName && (
            <span>alternativeName: {singleBody.alternativeName}</span>
          )}
          {singleBody.axialTilt > 0 && (
            <span>axialTilt: {singleBody.axialTilt}</span>
          )}
          {singleBody.avgTemp > 0 && <span>avgTemp: {singleBody.avgTemp}</span>}
          {singleBody.mainAnomaly > 0 && (
            <span>mainAnomaly: {singleBody.mainAnomaly}</span>
          )}
          {singleBody.argPeriapsis > 0 && (
            <span>argPeriapsis: {singleBody.argPeriapsis}</span>
          )}
          {singleBody.longAscNode > 0 && (
            <span>longAscNode: {singleBody.longAscNode}</span>
          )}
        </section>
        <section
          className='section-container section-moons'
          ref={addToRef}
          data-id={ID3}
        >
          <div className='moons-container'>
            {singleBody.moons &&
              singleBody.moons.map((moon) => {
                return (
                  <Link key={moon.moon} to={`/moons/`} state={moon.rel}>
                    {moon.moon}
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BodyInfo;
