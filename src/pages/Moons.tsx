import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Component
import BodyInfo from '../components/BodyInfo';
import BodyTitle from '../components/BodyTitle';

// image
import moon from '../assets/images/moon_map.jpeg';

// interface
import { singleBody } from '../context';

const Moons: React.FC = () => {
  const [singleMoon, setSingleMoon] = useState({} as singleBody);
  const [loading, setLoading] = useState(true);
  const moon = useLocation();
  const moonRel = moon.state;

  const getSingleMoon = async () => {
    setLoading(true);

    try {
      if (typeof moonRel === 'string') {
        const response = await axios.get(moonRel);
        const data = response.data;
        setSingleMoon(data);
        setLoading(false);
      }

      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleMoon(); // eslint-disable-next-line
  }, [moonRel]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Wrapper>
      <div className='single-body'>
        <div
          className={singleMoon.name === 'La Lune' ? 'moon' : 'not-moon'}
        ></div>
      </div>
      <div className='simple-body-container'>
        <div className='simple-body-title'>
          <BodyTitle singleBody={singleMoon} />
        </div>
        <BodyInfo singleBody={singleMoon} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem 1rem;
  .single-body {
    width: 300px;
    height: 300px;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 20px 20px #000 inset, 0 0 20px 2px #000;
  }

  .single-body:after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: -20px -20px 50px 2px #000 inset;
    border-radius: 50%;
  }

  .single-body > div {
    width: 200%;
    height: 100%;
    animation: spin 30s linear alternate infinite;
    background-size: cover;
  }
  .moon {
    background: url('${moon}');
  }
  .not-moon {
    background: radial-gradient(circle at 100px 100px, #5cabff, #000);
  }

  @keyframes spin {
    to {
      transform: translateX(-50%);
    }
  }
`;

export default Moons;
