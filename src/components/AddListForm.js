import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addList } from "../reducers/list";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  box-sizing: border-box;
  background: ${(props) => props.bg};
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  &:not(:disabled):hover {
    filter: brightness(1.1);
  }
`;

const Form = styled.form`
  display: inline-block;
`;
const FormUIbox = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  .title {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
    color: #4c4c4c;
    text-align: left;
  }
`;

const InputUI = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  height: 30px;
`;

const InputReadOnly = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  height: 30px;
`;

const AddListForm = ({ close, addList }) => {
  const [title, setTitle] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [isBase64, setIsBase64] = useState("");
  const [des, setDes] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeImg = (e) => {
    setImgFile(e.target.files[0].name);
    setIsBase64(e.target.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setIsBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      //   setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const handleDescription = (e) => {
    setDes(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      title,
      content: [
        {
          id: Date.now(),
          img: isBase64,
          des,
        },
      ],
    };
    addList(data);
    close(false);
  };

  return (
    <>
      <Form onSubmit={submitForm} autoComplete="off">
        <FormUIbox>
          <span className="title">Title</span>
          <InputUI
            type="text"
            id="ipt01"
            value={title}
            onChange={handleChangeTitle}
          />
        </FormUIbox>

        <FormUIbox>
          <span className="title">Attachments</span>
          <InputReadOnly type="text" readOnly value={imgFile} disabled />
          <InputUI
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleChangeImg}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="default"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </FormUIbox>

        <FormUIbox>
          <span className="title">Description</span>
          <InputUI type="text" value={des} onChange={handleDescription} />
        </FormUIbox>

        <ButtonBox>
          <ButtonWrap>
            <Button type="submit" bg={"#f7a917"} disabled={!title}>
              add
            </Button>
          </ButtonWrap>
        </ButtonBox>
      </Form>
    </>
  );
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addList: (data) => dispatch(addList(data)),
  };
};
export default connect(null, mapDispatchToProps)(AddListForm);
