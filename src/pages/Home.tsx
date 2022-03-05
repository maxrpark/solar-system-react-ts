import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import gsap from 'gsap';

import { UseGlobalContext } from '../context';
const Home: React.FC = () => {
  const { solarSistem }: any = UseGlobalContext();

  useEffect(() => {
    const allStars = document.querySelectorAll('.single-body')! as any;
    window.addEventListener('click', () => {
      allStars.forEach((star: any) => {
        if (star.style.animationPlayState === 'paused') {
          star.style.animationPlayState = 'running';
        } else {
          star.style.animationPlayState = 'paused';
        }
      });
    });
  });

  // useEffect(() => {
  //   // test gsap
  //   const mouseFollow = () => {
  //     gsap.set('.ball', { xPercent: -50, yPercent: -50 });
  //     const ball = document.querySelector('.ball');
  //     const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  //     const mouse = { x: pos.x, y: pos.y };
  //     const speed = 0.35;
  //     const xSet = gsap.quickSetter(ball, 'x', 'px');
  //     const ySet = gsap.quickSetter(ball, 'y', 'px');
  //     window.addEventListener('mousemove', (e) => {
  //       // console.log(e);
  //       const allStars = document.querySelectorAll('.single-body');
  //       const ball = document.querySelector('.ball');
  //       // if (!this.isModalOpen) {
  //       if (ball.classList.contains('ball-zoom')) {
  //         ball.classList.remove('ball-zoom');
  //       }
  //       // ball.classList.add('ball-zoom');

  //       // allStars.forEach((star) => {
  //       //   if (star.classList.contains('zoom')) {
  //       //     star.classList.remove('zoom');
  //       //   } else {
  //       //     return;
  //       //   }
  //       // });
  //       // }
  //       // media query to check
  //       // const media_query =
  //       //   'screen and (min-width:320px) and (max-width:960px)';
  //       // const matched = window.matchMedia(media_query).matches;
  //       if (e.target.classList.contains('single-body')) {
  //         // if (matched) {
  //         // e.target.classList.add('zoom');
  //         ball.classList.add('ball-zoom');
  //         allStars.forEach((star) => {
  //           star.style.animationPlayState = 'paused';
  //         });
  //         const height = e.target.offsetHeight;
  //         console.log(e.target.offsetHeight);
  //         const width = e.target.style.width;
  //         e.target.style.height = height * 0.6 + 'px';
  //         console.log(e.target.offsetHeight);
  //         // e.target.style.width = '40px';
  //         // }
  //       } else {
  //         allStars.forEach((star) => {
  //           star.style.animationPlayState = 'running';
  //         });
  //       }
  //       mouse.x = e.x;
  //       mouse.y = e.y;
  //       // console.log('hello');
  //     });
  //     gsap.ticker.add(() => {
  //       // adjust speed for higher refresh monitors
  //       const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
  //       pos.x += (mouse.x - pos.x) * dt;
  //       pos.y += (mouse.y - pos.y) * dt;
  //       // if (!this.moveCursor) {
  //       xSet(pos.x);
  //       ySet(pos.y);
  //       // }
  //     });
  //   };
  //   mouseFollow();
  // }, []);

  return (
    <Wrapper>
      {/* <div className='ball'></div> */}
      <div className='container'>
        {/* <div className='Sun'></div> */}
        {solarSistem.map((planet: any) => {
          return (
            <Link
              key={planet.id}
              to={`/planet/${planet.id}`}
              style={{
                height: `${planet.meanRadius / 6000}px`,
                width: `${planet.meanRadius / 6000}px`,
              }}
              className={`single-body animation ${planet.englishName.toLowerCase()}`}
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
    width: 10em;
    height: 10em;
    background-color: yellow;
    border-radius: 50%;
    box-shadow: 0 0 3em white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    /* border-style: solid;
    border-color: white transparent transparent transparent;
    border-width: 0.1em 0.1em 0 0;
    border-radius: 50%; */
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
    animation-duration: 10.5s;
  }

  .mercury::before {
    content: '';
    top: 100px;
    right: 100px;
    background-color: violet;
  }

  /* venus */
  .venus {
    animation-duration: 10.5s;
  }

  .venus::before {
    content: '';
    top: 60px;
    right: 60px;
    background-color: violet;
  }
  /* earth */
  .earth {
    animation-duration: 36.5s;
  }

  /* Sun	0
Mercury		57,910,000
Venus	108,200,000
Earth	149,600,000
Mars		227,940,000
Jupiter		778,330,000
Saturn		1,429,400,000
Uranus	2,870,990,000
Neptune		4,504,000,000 */

  .earth::before {
    content: '';
    top: 100px;
    right: 100px;
    background-color: aqua;
  }
  /* mars */
  .mars {
    animation-duration: 25.5s;
  }

  .mars::before {
    content: '';
    top: 120px;
    right: 120px;
    background-color: red;
  }
  /* jupiter */
  .jupiter {
    animation-duration: 30.5s;
  }

  .jupiter::before {
    content: '';
    top: 130px;
    right: 130px;
    background-color: pink;
  }
  /* saturn */
  .saturn {
    animation-duration: 32.5s;
  }

  .saturn::before {
    content: '';
    top: 140px;
    right: 140px;
    background-color: orange;
  }
  /* uranus */
  .uranus {
    animation-duration: 37.5s;
  }

  .uranus::before {
    content: '';
    top: 150px;
    right: 150px;
    background-color: blue;
  }
  /* neptune */
  .neptune {
    animation-duration: 40.5s;
  }

  .neptune::before {
    content: '';
    top: 160px;
    right: 160px;
    background-color: green;
  }

  @keyframes orbit {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
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
    /* transition: width 10s ease; */
  }
  @media screen and (max-width: 960px) {
    .ball {
      /* display: none; */
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
