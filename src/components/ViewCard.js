import React, { useState } from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const Wrap = styled.div`
  display: inline-block;
  flex-direction: column;
`;
const ImgView = styled.div`
  width: 100%;
  height: 150px;
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid #efefef;
  background: #fff;
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
  &:not(:first-child) {
    margin-left: 5px;
  }
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
  background-color: #fff;
  height: 30px;
`;

const InputReadOnly = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  height: 30px;
`;

const ViewCard = ({ data, close }) => {
  const { img, des, imgName } = data;
  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState(des);

  const [imgFile, setImgFile] = useState(imgName);
  const [isBase64, setIsBase64] = useState(img);
  const editCard = () => {
    setIsEdit(!isEdit);
  };
  const editSave = () => {
    const edit = {
      id: Date.now(),
      img: isBase64,
      imgName: imgFile,
      des: description,
    };
    Object.assign(data, edit);
    close(false);
  };
  const handleInputChange = (e) => {
    setDescription(e.target.value);
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
      // setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };
  const EditCamera = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <>
      <Wrap>
        {isEdit ? (
          <EditCamera />
        ) : (
          <ImgView
            className="img"
            style={{ backgroundImage: `url(${isBase64})` }}
          ></ImgView>
        )}
        <FormUIbox>
          {isEdit && <span className="title">Description</span>}

          <InputUI
            value={description}
            onChange={handleInputChange}
            disabled={!isEdit}
          />
        </FormUIbox>

        <ButtonBox>
          <ButtonWrap>
            <Button type="button" bg={"#c1b998"} onClick={editCard}>
              Edit
            </Button>
            <Button type="button" bg={"#f7a917"} onClick={editSave}>
              Save
            </Button>
          </ButtonWrap>
        </ButtonBox>
      </Wrap>
    </>
  );
};
export default ViewCard;
