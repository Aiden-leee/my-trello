import React from "react";
import styled, { keyframes } from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";

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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 380px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: ${(props) => (props.close ? "none" : "")};
`;

const Wrap = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  min-height: 300px;
  border-radius: 10px;
  background-color: #fff;
  margin: 0 10px;
  overflow: hidden;
  box-sizing: border-box;
  animation: ${ModalFadeIn} 0.3s ease-in-out;
`;

const ModalInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 5px 10px;
  background: #529494;
  > h2 {
    color: #fff;
  }
`;

const ModalBody = styled.div`
  flex: 1 1 auto;
  padding: 10px 10px 48px;
  text-align: center;
`;
const cancelStyle = {
  color: "#fff",
  cursor: "pointer",
};
const Modal = ({ visible, close, children, header }) => {
  const closeOverlay = (e) => {
    if (e.target !== e.currentTarget) return;
    close(false);
  };
  const closeModal = () => {
    close(false);
  };
  return (
    <>
      {/* <ModalOverlay visible={visible} onClick={closeOverlay} /> */}
      <ModalWrap visible={visible} onClick={closeOverlay}>
        <Wrap>
          <ModalInnerBox>
            <ModalHeader>
              <h2>{header}</h2>
              <CancelIcon onClick={closeModal} style={cancelStyle}></CancelIcon>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalInnerBox>
        </Wrap>
      </ModalWrap>
    </>
  );
};

export default Modal;
