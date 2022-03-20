import React from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { UseGlobalContext } from '../context';
import { Link } from 'react-router-dom';

type Props = {};
const Sidebar: React.FC = (props: Props) => {
  const { closeSidebar, isSideBarOpen, planetsNames } = UseGlobalContext();
  return (
    <Wrapper>
      <div className={`sidebar ${isSideBarOpen ? 'hideSidebar ' : ''}`}>
        <AiFillCloseCircle
          className='close-icon'
          onClick={() => closeSidebar()}
        />
        <ul>
          {planetsNames.map((item: string) => {
            return (
              <Link
                key={item}
                to={`/planet/${item}`}
                onClick={() => closeSidebar()}
              >
                {item}
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
    background-color: var(--color-black);
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: -100%;
    z-index: 2;
    transition: var(--transition-1);
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
  }
  .close-icon {
    right: 2rem;
    top: 2rem;
    position: absolute;
    color: white;
    font-size: 1.5rem;
  }
`;
