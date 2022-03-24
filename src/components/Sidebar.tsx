import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { UseGlobalContext } from '../context';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Sidebar: React.FC = () => {
  const { closeSidebar, isSideBarOpen } = UseGlobalContext();

  const planetList = [
    'uranus',
    'neptune',
    'jupiter',
    'mars',
    'mercure',
    'saturne',
    'terre',
    'venus',
  ];

  useEffect(() => {
    var links = gsap.utils.toArray('.link');
    if (isSideBarOpen) {
      var tl = gsap.timeline({
        defaults: {
          ease: 'power3.inOut',
          duration: 0.5,
        },
      });
      tl.fromTo(
        links,
        {
          opacity: 0,
          x: gsap.utils.wrap([-200, 200]),
          y: -200,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.3,
        }
      );
    }
  }, [isSideBarOpen]);

  return (
    <Wrapper>
      <div className={`sidebar ${isSideBarOpen ? 'hideSidebar ' : ''}`}>
        <AiFillCloseCircle
          className='close-icon'
          onClick={() => closeSidebar()}
        />
        <ul>
          {planetList.map((item: string) => {
            return (
              <Link
                className='link'
                key={item}
                to={`/planet/${item}`}
                onClick={() => closeSidebar()}
              >
                {item === 'terre' ? 'Earth' : item}
              </Link>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.section`
  .sidebar {
    background-color: rgba(0, 0, 0, 0.7);

    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: -100%;
    z-index: 2;
  }
  .hideSidebar {
    left: 0;
  }
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  a {
    text-decoration: none;
    text-transform: capitalize;
    color: var(--color-white);
    font-size: large;
    letter-spacing: 0.25rem;
    opacity: 0;
    transition: letter-spacing 0.3s ease-in-out;
  }
  a:hover {
    letter-spacing: 0.5rem;
  }
  .close-icon {
    right: 1.2rem;
    top: 1.2rem;
    position: absolute;
    color: white;
    font-size: 1.5rem;
  }
`;
