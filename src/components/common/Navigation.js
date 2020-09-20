import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import QueueIcon from "@material-ui/icons/Queue";

const HeaderBar = styled.div`
  position: relative;
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
  .listAdd {
    position: absolute;
    right: 0;
    transform: translate(0, 50%);
    margin-right: 20px;
    cursor: pointer;
  }
`;
export default function Navigation() {
  return (
    <>
      <HeaderBar>
        <Link to="/">
          <span>My Trello</span>
        </Link>
        <div className="listAdd">
          <QueueIcon></QueueIcon>
        </div>
      </HeaderBar>
    </>
  );
}
