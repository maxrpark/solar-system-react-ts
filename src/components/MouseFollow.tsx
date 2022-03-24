import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import gsap from 'gsap';
interface Mouse {
  x: number;
  y: number;
}

const MouseFollow = () => {
  const ball = useRef<HTMLDivElement>(null!);
  const innerBall = useRef<HTMLDivElement>(null!);
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse: Mouse = { x: pos.x, y: pos.y };
  const planetName = useRef<HTMLParagraphElement>(null!); // check

  const moveCoursorFunc = (e: MouseEvent): void => {
    const allStars = document.querySelectorAll<HTMLElement>('.single-body'); // useRef
    gsap.set(ball.current, { xPercent: -50, yPercent: -50 });
    const speed = 0.35;
    const xSet = gsap.quickSetter(ball.current, 'x', 'px');
    const ySet = gsap.quickSetter(ball.current, 'y', 'px');

    if (ball.current && innerBall.current !== null) {
      if (ball.current.classList.contains('ball-zoom')) {
        ball.current.classList.remove('ball-zoom');
      } else {
        innerBall.current.style.display = 'none';
      }
      if ((e!.target as HTMLElement).classList.contains('single-body')) {
        let innerBallColor = (e!.target as HTMLElement).id;

        ball.current.classList.add('ball-zoom');
        if (innerBallColor !== 'sun') {
          innerBall.current.style.display = 'block';
          innerBall.current.style.backgroundColor = `var(--${innerBallColor})`;
          planetName.current.textContent = innerBallColor;
        }
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
    mouse!.x = e!.x;
    mouse!.y = e!.y;

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  };

  useEffect(() => {
    const media_query = 'screen and (min-width:1300px)';
    const matched = window.matchMedia(media_query).matches;
    if (matched) {
      window.addEventListener('mousemove', moveCoursorFunc);
    }
    return () => {
      window.removeEventListener('mousemove', moveCoursorFunc);
    };
  });
  return (
    <Wrapper>
      <div className='ball' ref={ball}>
        <div className='ball-inner' ref={innerBall}>
          <p ref={planetName}></p>
        </div>
      </div>
    </Wrapper>
  );
};

export default MouseFollow;

const Wrapper = styled.section`
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
    display: none;
  }
  .ball-inner p {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    color: var(--color-white);
    text-transform: capitalize;
  }
  @media screen and (max-width: 1300px) {
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
