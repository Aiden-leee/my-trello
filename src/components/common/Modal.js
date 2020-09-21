import React from "react";
import styled, { keyframes } from "styled-components";

const ModalFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translate(0, 10%);
    }
    to {
        opacity: 1;
        transform: translate(0, 0);
    }
`;

const ModalWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: ${(props) => (props.close ? "none" : "")};
`;

const Wrap = styled.div`
  width: 500px;
  height: 300px;
  min-height: 300px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  margin: 0 10px;
  animation: ${ModalFadeIn} 0.3s ease-in-out;
`;

const ModalInnerBox = styled.div``;

const Modal = ({ visible, close }) => {
  const closeOverlay = (e) => {
    if (e.target !== e.currentTarget) return;
    close(false);
  };
  return (
    <>
      {/* <ModalOverlay visible={visible} onClick={closeOverlay} /> */}
      <ModalWrap visible={visible} onClick={closeOverlay}>
        <Wrap>
          <ModalInnerBox>modal</ModalInnerBox>
        </Wrap>
      </ModalWrap>
    </>
  );
};

export default Modal;
