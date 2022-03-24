import React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UseGlobalContext } from '../context';

// components
import SolarSystem from '../components/SolarSystem';
import MouseFollow from '../components/MouseFollow';
import Loader from '../components/Loader';
const Home: React.FC = () => {
  const { solarSistem, isLoading } = UseGlobalContext();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <MouseFollow />
      <SolarSystem solarSistem={solarSistem} />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  margin: 1rem 0;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: black;
`;
