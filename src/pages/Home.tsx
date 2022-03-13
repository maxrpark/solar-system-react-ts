import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';

import { UseGlobalContext } from '../context';

interface singleBody {
  id: string;
  name: string;
  meanRadius: number;
  isPlanet: boolean;
  englishName: string;
}

const Home: React.FC = () => {
  const { solarSistem, scale, speed, controlSpeed, controlSize } =
    UseGlobalContext();

  const speedBtn = useRef<HTMLButtonElement>(null!);
  const scaleBtn = useRef<HTMLButtonElement>(null!);
  const container = useRef<HTMLDivElement>(null!);
  const singleBody = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    speedBtn.current.addEventListener('click', () => {
      controlSpeed();
    });
    scaleBtn.current.addEventListener('click', () => {
      controlSize();
    });
  }, [speed, scale]);

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

  useEffect(() => {
    // test gsap
    const mouseFollow = () => {
      gsap.set('.ball', { xPercent: -50, yPercent: -50 });
      const ball = document.querySelector('.ball')! as HTMLElement;
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };
      const speed = 0.35;
      const xSet = gsap.quickSetter(ball, 'x', 'px');
      const ySet = gsap.quickSetter(ball, 'y', 'px');
      window.addEventListener('mousemove', (e) => {
        const allStars = document.querySelectorAll<HTMLElement>('.single-body');

        const ball = document.querySelector('.ball')! as HTMLDivElement;
        const innerBall = document.querySelector(
          '.ball-inner'
        )! as HTMLDivElement;
        if (ball) {
          if (ball.classList.contains('ball-zoom')) {
            ball.classList.remove('ball-zoom');
          } else {
            innerBall.style.display = 'none';
          }
        }

        // allStars.forEach((star) => {
        //   if (star.classList.contains('zoom')) {
        //     star.classList.remove('zoom');
        //   } else {
        //     return;
        //   }
        // });
        // }
        // media query to check
        // const media_query =
        //   'screen and (min-width:320px) and (max-width:960px)';
        // const matched = window.matchMedia(media_query).matches;
        // (e.target as HTMLElement).classList.add('zoom');
        if ((e.target as HTMLElement).classList.contains('single-body')) {
          let innerBallColor = (e.target as HTMLElement).id;

          ball.classList.add('ball-zoom');
          if (innerBallColor !== 'sun') {
            innerBall.style.display = 'block';
            innerBall.style.backgroundColor = `var(--${innerBallColor})`;
          }
          allStars.forEach((star: HTMLElement) => {
            star.addEventListener('mouseover', () => {
              allStars.forEach((star: HTMLElement) => {
                star.style.animationPlayState = 'paused';
              });
            });
          });

          allStars.forEach((star: HTMLElement) => {
            star.addEventListener('mouseleave', () => {
              allStars.forEach((star: HTMLElement) => {
                star.style.animationPlayState = 'running';
              });
            });
          });
        }
        mouse.x = e.x;
        mouse.y = e.y;
      });
      gsap.ticker.add(() => {
        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        // if (!this.moveCursor) {
        xSet(pos.x);
        ySet(pos.y);
        // }
      });
    };
    mouseFollow();
  }, []);

  return (
    <Wrapper>
      <div className='ball'>
        <div className='ball-inner'></div>
      </div>
      <button ref={speedBtn} className='btn'>
        Speed
      </button>
      <button ref={scaleBtn} className='btn'>
        Scale
      </button>
      <div ref={container} className='container'>
        {solarSistem.map((planet: singleBody) => {
          return (
            <Link
              ref={singleBody}
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
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  overflow: hidden;

  .container {
    font-size: 10px;
    width: 50em;
    height: 50em;
    position: relative;
    border: 2px solid red;
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
    top: 150px;
    right: 150px;
    background-color: var(--uranus);
  }
  /* neptune */
  .neptune {
    /* animation-duration: 40.5s; */
    animation-duration: 18s;
  }

  .neptune::before {
    content: '';
    top: 140px;
    right: 140px;
    background-color: var(--neptune);
  }

  @media screen and (min-width: 678px) {
    .saturn::before {
      top: 140px;
      right: 140px;
    }

    .neptune::before {
      top: 170px;
      right: 170px;
    }

    .uranus::before {
      top: 160px;
      right: 160px;
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

  /* test */

  .ball {
    width: 50px;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    border: 3px solid white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    transition: height 0.2s ease, width 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ball-inner {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    z-index: 2;
  }
  @media screen and (max-width: 960px) {
    .ball {
      display: none;
    }
  }
  .zoom {
    transform: scale(5);
    max-height: 50px;
    max-width: 50px;
    animation: none;
  }
  .ball-zoom {
    width: 100px;
    height: 100px;
    border: 1px solid white;
  }
`;
