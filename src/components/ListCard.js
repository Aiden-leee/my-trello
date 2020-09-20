import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Dragula from "react-dragula";
import "dragula/dist/dragula.css";

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
      overflow: hidden;
      font-size: 14px;
      color: #383838;
      text-overflow: ellipsis;
      border-bottom: 1px solid #eaeaea;
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
        color: #808080;
      }
    }
  }
`;
const ListCard = ({ data }) => {
  console.log(data);

  useEffect(() => {
    let list = Array.from(document.querySelectorAll(".list"));
    let listContent = Array.from(document.querySelectorAll(".list-content"));
    let options = {};
    console.log(list);
    Dragula([...listContent], options);
  }, []);

  return (
    <>
      {data.map((item) => {
        return (
          <List key={item.id} className="list">
            <div className="list-wrap">
              <div className="list-title">{item.title}</div>
              <div className="list-content">
                {item.content.map((content) => {
                  return (
                    <div className="list-card" key={content.id}>
                      <div className="list-image">
                        <div
                          className="img"
                          style={{ backgroundImage: `url(${content.img})` }}
                        ></div>
                        {/* <img src={content.img} alt="" /> */}
                      </div>
                      <div className="list-text">{content.text}</div>
                      <div className="list-badges">
                        {content.text && (
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
                            <span className="attachCount">1</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="list-bottom">
                <div className="add">
                  <AddBoxIcon style={{ cursor: "pointer" }}></AddBoxIcon>
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

{
  /* <List>
        <div className="list-wrap">
          <div className="list-title">
            첫번째 목록 첫번째 목록 첫번째 목록 첫번째 목록
          </div>
          <div className="list-content">
            <div className="list-card">
              <div className="list-image">
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt=""
                />
              </div>
              <div className="list-text">어서오세요 환영합니다.</div>
              <div className="list-badges">
                <div className="badge">
                  <span>
                    <SubjectIcon style={materialIconStyle}></SubjectIcon>
                  </span>
                </div>
                <div className="badge">
                  <span>
                    <AttachFileIcon style={materialIconStyle}></AttachFileIcon>
                  </span>
                  <span className="attachCount">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </List> */
}
