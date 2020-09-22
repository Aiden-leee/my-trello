import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import QueueIcon from "@material-ui/icons/Queue";
import Modal from "./Modal";
import AddListForm from "../AddListForm";

const HeaderBar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 56px;
  background: #529494;
  color: #fff;
  z-index: 1;
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

    &:hover {
      color: #79dada;
    }
    > svg {
      cursor: pointer;
    }
  }
`;
export default function Navigation() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = (e) => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = (v) => {
    setIsModalVisible(v);
  };

  return (
    <>
      {isModalVisible && (
        <Modal visible={isModalVisible} close={closeModal} header="Add List">
          <AddListForm close={closeModal}></AddListForm>
        </Modal>
      )}
      <HeaderBar>
        <Link to="/">
          <span>My Trello</span>
        </Link>
        <div className="listAdd" onClick={openModal}>
          <QueueIcon></QueueIcon>
        </div>
      </HeaderBar>
    </>
  );
}
