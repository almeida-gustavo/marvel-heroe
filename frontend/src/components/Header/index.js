import React from 'react';

import { useLocation } from 'react-router-dom';

import { Container, StyledLink } from './styles';



const Header = ({ size = 'large' }) => {
  const currentLocation = useLocation();

  return (
    <>
      <Container size={size}>
        <header>
          <nav>
            <StyledLink active={currentLocation.pathname === '/heroes'} to="/heroes">
              Heroes
            </StyledLink>
            <StyledLink
              active={currentLocation.pathname === '/my-heroes'}
              to="/my-heroes"
            >
              My Heroes
            </StyledLink>
            <StyledLink
              active={currentLocation.pathname === '/comics'}
              to="/comics"
            >
              Comics
            </StyledLink>
            <StyledLink
              active={currentLocation.pathname === '/my-comics'}
              to="/my-comics"
            >
              My Comics
            </StyledLink>
          </nav>
        </header>
      </Container>
    </>
  );
};

export default Header;
