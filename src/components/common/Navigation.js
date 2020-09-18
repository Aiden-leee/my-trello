import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 56px;
  background: #529494;
  color: #fff;
  > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > span {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;
export default function Navigation() {
  return (
    <>
      <HeaderBar>
        <Link to="/">
          <span>Trello Style</span>
        </Link>
      </HeaderBar>
    </>
  );
}
