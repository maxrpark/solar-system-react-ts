import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Component
import BodyInfo from '../components/BodyInfo';
import BodyTitle from '../components/BodyTitle';
import Loader from '../components/Loader';

// images
import sun from '../assets/images/sun.jpeg';
import mercurio from '../assets/images/mercurio.jpeg';
import venus from '../assets/images/venus.jpeg';
import earth from '../assets/images/earth.jpeg';
import mars from '../assets/images/mars.webp';
import jupiter from '../assets/images/jupiter.jpeg';
import saturn from '../assets/images/saturn.webp';
import uranus from '../assets/images/uranus.png';
import neptune from '../assets/images/neptune.jpeg';

// interface
// interface
import { singleBody } from '../context';

const Planet: React.FC = () => {
  const [singlePlanet, setSinglePlanet] = useState({} as singleBody);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const getSinglePlanet = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.le-systeme-solaire.net/rest/bodies/${id}`
      );
      const data = response.data;
      setSinglePlanet(data);
      setLoading(false);

      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSinglePlanet(); // eslint-disable-next-line
  }, [id]);
  if (loading) {
    return <Loader />;
  }
  return (
    <Wrapper key={singlePlanet.name}>
      <div className='single-body'>
        <div className={`${singlePlanet.englishName.toLowerCase()}`}></div>
      </div>
      <div className='single-body-container'>
        <div className='single-body-title'>
          <BodyTitle singleBody={singlePlanet} />
        </div>
        <BodyInfo singleBody={singlePlanet} />
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

  .sun {
    background: url('${sun}');
  }
  .mercury {
    background: url('${mercurio}');
  }
  .venus {
    background: url('${venus}');
  }
  .earth {
    background: url('${earth}');
  }
  .mars {
    background: url('${mars}');
  }

  .jupiter {
    background: url('${jupiter}');
  }
  .saturn {
    background: url('${saturn}');
  }
  .uranus {
    background: url('${uranus}');
  }
  .neptune {
    background: url('${neptune}');
  }
  @keyframes spin {
    to {
      transform: translateX(-50%);
    }
  }
`;

export default Planet;
