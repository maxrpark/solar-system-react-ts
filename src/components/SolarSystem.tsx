import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UseGlobalContext } from '../context';
import { singleBody } from '../context';

interface Props {
  solarSistem: singleBody[];
}

const SolarSystem: React.FC<Props> = ({ solarSistem }) => {
  const { scale, speed, controlSpeed, controlSize } = UseGlobalContext();
  const [size, setSize] = useState(window.innerWidth) as any;
  const container = useRef<HTMLDivElement>(null!);
  const messege = useRef<HTMLParagraphElement>(null!); // check

  const speedBtn = useRef<HTMLButtonElement>(null!); // btn speed
  const scaleBtn = useRef<HTMLButtonElement>(null!); // btn scale

  // control speed and size
  useEffect(() => {
    speedBtn.current.addEventListener('click', () => {
      controlSpeed();
    });
    scaleBtn.current.addEventListener('click', () => {
      controlSize();
    });
  }, [speed, scale]);

  const messegeFunction = () => {
    setSize(window.innerWidth);

    if (size < 1300) {
      messege.current.textContent =
        'Click to pause or click on a planet to see more info';
    } else {
      messege.current.textContent =
        'Click to pause, hover over a planet to pause and click to see more info';
    }
  };

  useEffect(() => {
    messegeFunction();
    window.addEventListener('resize', messegeFunction);
    return () => {
      window.removeEventListener('resize', messegeFunction);
    };
  });

  useEffect(() => {
    const allStars = document.querySelectorAll<HTMLElement>('.single-body');
    container.current.addEventListener('click', () => {
      allStars.forEach((star: HTMLElement) => {
        if (star.style.animationPlayState === 'paused') {
          star.style.animationPlayState = 'running';
        } else {
          star.style.animationPlayState = 'paused';
        }
      });
    });
  }, [solarSistem]);

  return (
    <Wrapper>
      <div ref={container} className='container'>
        <p className='messege' ref={messege}></p>
        {solarSistem.map((planet: singleBody) => {
          return (
            <Link
              key={planet.id}
              to={`/planet/${planet.id}`}
              id={`${planet.englishName.toLowerCase()}`}
              style={
                scale
                  ? {
                      height: `${planet.meanRadius / 6000}px`,
                      width: `${planet.meanRadius / 6000}px`,
                    }
                  : {}
              }
              className={
                speed
                  ? `single-body animation  ${planet.englishName.toLowerCase()} `
                  : `single-body animation ${planet.englishName.toLowerCase()} speed`
              }
            ></Link>
          );
        })}
      </div>
      <div className='options'>
        <button ref={speedBtn} className='btn'>
          Speed
        </button>
        <button ref={scaleBtn} className='btn'>
          Scale
        </button>
      </div>
    </Wrapper>
  );
};
export default SolarSystem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .options {
    display: flex;
    gap: 0.5rem;
  }
  .btn {
    background-color: var(--color-white);
    padding: 0.4rem 0.7rem;
    border: 2px solid var(--color-white);
    border-radius: var(--border-radius-1);
    transition: var(--transition-1);
    font-family: 'Space Mono', monospace;
  }
  .btn:hover {
    background-color: var(--color-black);
    border: 2px solid var(--color-white);
    color: var(--color-white);
  }
  .container {
    font-size: 10px;
    width: 100%;
    height: 50em;
    position: relative;
  }
  .messege {
    text-align: center;
    margin: 1rem;
    color: var(--color-white);
    font-size: 1rem;
  }
  .sun {
    position: absolute;
    width: 3rem;
    height: 3rem;
    background-color: var(--sun);
    border-radius: 50%;
    box-shadow: 0 0 3em white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .mercury,
  .venus,
  .mars,
  .earth,
  .jupiter,
  .saturn,
  .uranus,
  .neptune {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
  }

  @media screen and (min-width: 678px) {
    .mercury,
    .venus,
    .mars,
    .earth,
    .jupiter,
    .saturn,
    .uranus,
    .neptune {
      width: 1rem;
      height: 1rem;
    }
  }

  .animation {
    animation: orbit 36.5s linear infinite;
  }

  .mercury::before,
  .venus::before,
  .earth::before,
  .mars::before,
  .venus::before,
  .jupiter::before,
  .saturn::before,
  .uranus::before,
  .neptune::before {
    position: absolute;
    border-radius: 50%;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  /* mercury */
  .mercury {
    animation-duration: 4s;
  }

  .mercury::before {
    content: '';
    top: 40px;
    right: 40px;
    background-color: var(--mercury);
  }

  /* venus */
  .venus {
    animation-duration: 6s;
  }
  .venus::before {
    content: '';
    top: 60px;
    right: 60px;
    background-color: var(--venus);
  }
  /* earth */
  .earth {
    animation-duration: 8s;
    /* animation-duration: 36.5s; */
  }

  .earth::before {
    content: '';
    top: 80px;
    right: 80px;
    background-color: var(--earth);
  }
  /* mars */
  .mars {
    animation-duration: 9s;
  }

  .mars::before {
    content: '';
    top: 100px;
    right: 100px;
    background-color: var(--mars);
  }
  /* jupiter */
  .jupiter {
    animation-duration: 11s;
    /* animation-duration: 30.5s; */
  }

  .jupiter::before {
    content: '';
    top: 120px;
    right: 120px;
    background-color: var(--jupiter);
  }
  /* saturn */
  .saturn {
    animation-duration: 14s;
    /* animation-duration: 32.5s; */
  }

  .saturn::before {
    content: '';
    top: 130px;
    right: 130px;
    background-color: var(--saturn);
  }
  /* uranus */
  .uranus {
    animation-duration: 16s;
    /* animation-duration: 37.5s; */
  }

  .uranus::before {
    content: '';
    top: 140px;
    right: 140px;
    background-color: var(--uranus);
  }

  /* neptune */
  .neptune {
    animation-duration: 18s;
  }
  .neptune::before {
    content: '';
    top: 150px;
    right: 150px;
    background-color: var(--neptune);
  }

  @media screen and (min-width: 678px) {
    .saturn::before {
      top: 120px;
      right: 120px;
    }

    .uranus::before {
      top: 130px;
      right: 130px;
    }
    .neptune::before {
      top: 140px;
      right: 140px;
    }
  }

  @keyframes orbit {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  // speed
  .mercury.speed {
    animation-duration: 0.4s;
  }
  .venus.speed {
    animation-duration: 1s;
  }
  .earth.speed {
    animation-duration: 1.6s;
  }
  .mars.speed {
    animation-duration: 3s;
  }
  .jupiter.speed {
    animation-duration: 18s;
  }
  .saturn.speed {
    animation-duration: 44s;
  }
  .uranus.speed {
    animation-duration: 140s;
  }
  .neptune.speed {
    animation-duration: 260s;
  }
`;
