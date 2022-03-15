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
        <AiFillCloseCircle onClick={() => closeSidebar()} />
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
    background-color: red;
    width: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: -100%;
    z-index: 2;
    transition: var(--transition-1);
  }
  .hideSidebar {
    left: 0;
  }
`;
