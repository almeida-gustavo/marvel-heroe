/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  border-collapse: collapse;

  table,
  th,
  td {
    border: 1px solid black;
  }

  th {
    height: 50px;
  }

  tbody {
    margin-top: 20px;
  }

  td {
    height: 30px;
    text-align: center;
    /* padding-left: 10px; */

    button {
      border: none;
      background: transparent;
    }
  }
`;
