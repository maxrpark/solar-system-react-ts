import React from 'react';
import styled from 'styled-components';
import { UseGlobalContext } from '../context';
import { BiPlanet } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { openSidebar, closeSidebar } = UseGlobalContext();
  return (
    <Wrapper>
      <div className='navbar'>
        <Link to={'/'}>
          <h2 onClick={() => closeSidebar()}>Solar System</h2>
        </Link>
        <BiPlanet className='icon' onClick={() => openSidebar()} />
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  background-color: black;
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  a {
    z-index: 10;
  }
  .icon {
    font-size: 2rem;
  }
`;
