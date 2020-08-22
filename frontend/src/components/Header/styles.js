import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';



export const Container = styled.div`
  display: block;
  width: 100%;
  background: #848484;
  padding: 30px 0;

  header {
    nav {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;

export const StyledLink = styled(Link)`
  ${(props) =>
    props.active &&
    css`
      border-bottom: 2px solid #ff872c;
    `}
`;
