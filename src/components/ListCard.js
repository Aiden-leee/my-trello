import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Dragula from "react-dragula";
import "dragula/dist/dragula.css";
import emptyImg from "../assets/img/empty.jpg";
import Modal from "./common/Modal";
import CreateCard from "./CreateCard";

const materialIconStyle = {
  color: "#bbb",
  fontSize: "18px",
};

const List = styled.div`
  display: inline-block;
  width: 272px;
  height: 100%;
  margin: 0 5px;
  box-sizing: border-box;
  border-radius: 5px;
  > .list-wrap {
    display: flex;
    flex-direction: column;
    background: #dadada;
    max-height: 100%;
    border-radius: 5px;
    user-select: none;
    > .list-title {
      padding: 10px;
      font-size: 14px;
      color: #383838;
      border-bottom: 1px solid #eaeaea;
      > h2 {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    > .list-content {
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      min-height: 30px;
      padding: 10px 10px 0;

      > .list-card {
        max-width: 300px;
        background-color: #fff;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;

        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        cursor: move;
        cursor: grab;
        &:not(:first-child) {
          margin-top: 8px;
        }
        &:hover {
          opacity: 0.85;
        }
        > .list-image {
          > .img {
            height: 150px;
            background-size: cover;
            background-position: 50%;
            border-radius: 5px;
          }
          > img {
            max-width: 100%;
            border-radius: 5px;
          }
        }
        > .list-text {
          padding: 5px 0;
        }
        > .list-badges {
          display: flex;
          > .badge {
            display: flex;
            width: 18px;
            height: 18px;
            > span {
              display: inline-block;
              width: 100%;
              height: 100%;
              &.attachCount {
                font-size: 12px;
                color: #aaa;
                vertical-align: top;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
    > .list-bottom {
      padding: 5px 10px;
      > .add {
        display: flex;
        flex-direction: row-reverse;

        > svg {
          color: #808080;
          cursor: pointer;
          &:hover {
            color: #6d6d6d;
          }
        }
      }
    }
  }
`;

let drake = null;
const initDragula = () => {
  let list = Array.from(document.querySelectorAll(".list"));
  let listContent = Array.from(document.querySelectorAll(".list-content"));
  let options = {};
  drake = Dragula([...listContent], options);
};

const ListCard = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCurrentItem, setIsCurrentItem] = useState(null);
  const { list } = data;

  useEffect(() => {
    initDragula();
  }, []);
  useEffect(() => {
    drake.destroy();
    initDragula();
  }, [data]);

  const openModal = (e, id) => {
    let currentItem = list.find((item) => {
      return item.id === id;
    });
    setIsCurrentItem(currentItem);
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = (v) => {
    setIsModalVisible(v);
  };
  return (
    <>
      {isModalVisible && (
        <Modal visible={isModalVisible} close={closeModal} header="Create Card">
          <CreateCard data={isCurrentItem} close={closeModal}></CreateCard>
        </Modal>
      )}
      {list.length > 0 &&
        list.map((item) => {
          return (
            <List key={item.id}>
              <div className="list-wrap">
                <div className="list-title">
                  <h2>{item.title}</h2>
                </div>
                <div className="list-content">
                  {item.content.map((content) => {
                    return (
                      <div className="list-card" key={content.id}>
                        <div className="list-image">
                          {content.img !== "" ? (
                            <div
                              className="img"
                              style={{ backgroundImage: `url(${content.img})` }}
                            ></div>
                          ) : (
                            <div
                              className="img empty"
                              style={{ backgroundImage: `url(${emptyImg})` }}
                            ></div>
                          )}
                        </div>
                        <div className="list-text">{content.des}</div>
                        <div className="list-badges">
                          {content.des && (
                            <div className="badge">
                              <span>
                                <SubjectIcon
                                  style={materialIconStyle}
                                ></SubjectIcon>
                              </span>
                            </div>
                          )}
                          {content.img && (
                            <div className="badge">
                              <span>
                                <AttachFileIcon
                                  style={materialIconStyle}
                                ></AttachFileIcon>
                              </span>
                              {/* <span className="attachCount">1</span> */}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="list-bottom">
                  <div className="add">
                    <AddBoxIcon
                      onClick={(e) => openModal(e, item.id)}
                    ></AddBoxIcon>
                  </div>
                </div>
              </div>
            </List>
          );
        })}
    </>
  );
};

export default ListCard;
