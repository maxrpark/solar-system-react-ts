import React from 'react';
import { Link } from 'react-router-dom';
import { UseGlobalContext } from '../context';
import TypeWriterEffect from 'react-typewriter-effect';

import { Props } from '../context';

const BodyInfo: React.FC<Props> = ({ singleBody }) => {
  const { ID1, ID2, ID3, addToRef, showSection, addBtnsToRef } =
    UseGlobalContext();
  return (
    <div className='single-body-info'>
      <div className='section-options'>
        <button
          ref={addBtnsToRef}
          onClick={showSection}
          className='option-btn active'
          data-id={ID1}
        >
          Summary
        </button>
        <button
          ref={addBtnsToRef}
          onClick={showSection}
          className='option-btn'
          data-id={ID2}
        >
          Details
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
          <TypeWriterEffect
            startDelay={100}
            cursorColor='transparent'
            text={`Mean Radius: ${singleBody.meanRadius
              .toString()
              .slice(0, 2)}`}
            typeSpeed={100}
          />

          <TypeWriterEffect
            startDelay={100}
            cursorColor='transparent'
            text={`Eccentricity: ${singleBody.eccentricity}`}
            typeSpeed={100}
          />

          {singleBody.meanRadius && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Radius: ${singleBody.meanRadius}`}
              typeSpeed={100}
            />
          )}
          {singleBody.mass && singleBody.mass.massValue > 0 && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Mass Value: ${singleBody.mass.massValue}`}
              typeSpeed={100}
            />
          )}
          {singleBody.vol && singleBody.vol.volValue > 0 && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Vol Value: ${singleBody.vol.volValue}`}
              typeSpeed={100}
            />
          )}
          {singleBody.density > 0 && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Density: ${singleBody.density}`}
              typeSpeed={100}
            />
          )}
          {singleBody.gravity > 0 && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Gravity: ${singleBody.gravity}`}
              typeSpeed={100}
            />
          )}
          {singleBody.escape > 0 && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`Escape: ${singleBody.escape}`}
              typeSpeed={100}
            />
          )}

          {singleBody.equaRadius > 0 && (
            <TypeWriterEffect
              startDelay={100}
              cursorColor='transparent'
              text={`EquaRadius: ${singleBody.equaRadius}`}
              typeSpeed={100}
            />
          )}
        </section>
        <section className='section-container' ref={addToRef} data-id={ID2}>
          {singleBody.polarRadius > 0 && (
            <p>PolarRadius: {singleBody.polarRadius}</p>
          )}
          {singleBody.flattening > 0 && (
            <p>Flattening: {singleBody.flattening}</p>
          )}
          {singleBody.dimension > 0 && <p>Dimension: {singleBody.dimension}</p>}
          {singleBody.sideralOrbit > 0 && (
            <p>Sideral Orbit: {singleBody.sideralOrbit}</p>
          )}
          {singleBody.sideralRotation > 0 && (
            <p>Sideral Rotation: {singleBody.sideralRotation}</p>
          )}
          {singleBody.discoveryDate && (
            <p>Discovery Date: {singleBody.discoveryDate}</p>
          )}
          {singleBody.discoveredBy && (
            <p>Discovered By: {singleBody.discoveredBy}</p>
          )}
          {singleBody.alternativeName && (
            <p>Alternative Name: {singleBody.alternativeName}</p>
          )}
          {singleBody.axialTilt > 0 && <p>AxialTilt: {singleBody.axialTilt}</p>}
          {singleBody.avgTemp > 0 && <p>avgTemp: {singleBody.avgTemp}</p>}
          {singleBody.mainAnomaly > 0 && (
            <p>MainAnomaly: {singleBody.mainAnomaly}</p>
          )}
          {singleBody.argPeriapsis > 0 && (
            <p>ArgPeriapsis: {singleBody.argPeriapsis}</p>
          )}
          {singleBody.longAscNode > 0 && (
            <p>LongAscNode: {singleBody.longAscNode}</p>
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
