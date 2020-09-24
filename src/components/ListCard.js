import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { removeData } from "../reducers/list";
// component
import CreateCard from "./CreateCard";
import ViewCard from "./ViewCard";
//material
import SubjectIcon from "@material-ui/icons/Subject";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// dragula
import Dragula from "react-dragula";
import "dragula/dist/dragula.css";
// empty image
import emptyImg from "../assets/img/empty.jpg";
// modal
import Modal from "./common/Modal";

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
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: #dadada;
  max-height: 100%;
  border-radius: 5px;
  user-select: none;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 14px;
  color: #383838;
  border-bottom: 1px solid #eaeaea;
  > h2 {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > svg {
    color: #808080;
    cursor: pointer;
    &:hover {
      color: #6d6d6d;
    }
  }
`;
const ListContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 30px;
  padding: 10px 10px 0;
`;

const ListCards = styled.div`
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
`;
const ListImage = styled.div`
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
`;

const ListText = styled.div`
  padding: 5px 0;
`;

const ListBadge = styled.div`
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
`;
const ListBottom = styled.div`
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
`;

let drake = null;
const initDragula = () => {
  // let list = Array.from(document.querySelectorAll(".list"));
  let listContent = Array.from(document.querySelectorAll(".list-content"));
  drake = Dragula([...listContent]);
};

const dropDataChange = (data) => {
  if (data) {
    const { list } = data;

    drake.on("drop", (el, target, source) => {
      const id = el.attributes.data.value; // object
      const prevListId = source.attributes.data.value; // 이전 list dom
      const targetId = target.attributes.data.value; // drop dom
      let drag, drop, dragIndex, dropItem;
      // drag 이벤트를 실행한 List data
      //   drag = list.find((v) => {
      //     return Number(v.id) === Number(prevListId);
      //   });
      //   // drag object find index
      //   dragIndex = drag.content.findIndex((tem) => {
      //     return Number(tem.id) === Number(id);
      //   });
      //   // drop data
      //   dropItem = drag.content.filter((item) => {
      //     return Number(item.id) === Number(id);
      //   });
      //   // drag area remove
      //   drag.content.splice(dragIndex, 1);
      //   drop = list.find((v) => {
      //     return Number(v.id) === Number(targetId);
      //   });
      //   // drop area add
      //   drop.content.push(dropItem[0]);
    });
  }
};

const ListCard = ({ data, removeData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isCurrentItem, setIsCurrentItem] = useState(null);
  const [isCurrent, setIsCurrent] = useState(null);
  const [headerName, setHeaderName] = useState("");
  const [listId, setListId] = useState("");
  const { list } = data;

  useEffect(() => {
    initDragula();
  }, []);
  useEffect(() => {
    drake.destroy();
    initDragula();
    dropDataChange(data);
  }, [data]);

  const openModal = (e, id) => {
    let currentItem = list.find((item) => {
      return item.id === id;
    });

    setHeaderName("Create Card");
    setIsCurrentItem(currentItem);
    setIsViewModal(false);
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = (v) => {
    setIsModalVisible(v);
  };

  const viewModal = (e, item, id) => {
    let current = item.content.find((card) => {
      return card.id === id;
    });
    setHeaderName("Card");
    setIsCurrent(current);
    setListId(item.id);
    setIsViewModal(true);
    setIsModalVisible(!isModalVisible);
  };

  const removeList = (e, id) => {
    removeData(id);
  };

  return (
    <>
      {isModalVisible && (
        <Modal visible={isModalVisible} close={closeModal} header={headerName}>
          {!isViewModal ? (
            <CreateCard data={isCurrentItem} close={closeModal}></CreateCard>
          ) : (
            <ViewCard
              currentdata={isCurrent}
              listId={listId}
              data={list}
              close={closeModal}
            ></ViewCard>
          )}
        </Modal>
      )}

      {list.length > 0 &&
        list.map((item) => {
          return (
            <List key={item.id}>
              <ListWrap>
                <ListTitle>
                  <h2>{item.title}</h2>
                  <DeleteForeverIcon onClick={(e) => removeList(e, item.id)} />
                </ListTitle>
                <ListContent className="list-content" data={item.id}>
                  {item.content.map((content) => {
                    return (
                      <ListCards
                        className="list-card"
                        key={content.id}
                        data={content.id}
                        onDoubleClick={(e) => viewModal(e, item, content.id)}
                      >
                        <ListImage className="list-image">
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
                        </ListImage>
                        <ListText className="list-text">{content.des}</ListText>
                        <ListBadge className="list-badges">
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
                            </div>
                          )}
                        </ListBadge>
                      </ListCards>
                    );
                  })}
                </ListContent>
                <ListBottom>
                  <div className="add">
                    <AddBoxIcon
                      onClick={(e) => openModal(e, item.id)}
                    ></AddBoxIcon>
                  </div>
                </ListBottom>
              </ListWrap>
            </List>
          );
        })}
    </>
  );
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    removeData: (id) => dispatch(removeData(id)),
  };
};

export default connect(null, mapDispatchToProps)(ListCard);
