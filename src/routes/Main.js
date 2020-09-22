import React from "react";
import { connect } from "react-redux";
import ListCard from "../components/ListCard";
import styled from "styled-components";

const Content = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  padding: 76px 20px 30px;
  box-sizing: border-box;
`;

const Main = ({ listData }) => {
  // const listCard = [
  //   {
  //     id: 1,
  //     title: "첫번째 목록입니다. 이 영역은 타이틀입니다.",
  //     content: [
  //       {
  //         id: 1,
  //         img: "https://source.unsplash.com/user/erondu/500x900",
  //         text: "어서오세요 환영합니다",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "두번째 목록입니다. 이 영역은 타이틀입니다.",
  //     content: [
  //       {
  //         id: 1,
  //         img: "https://source.unsplash.com/user/erondu/1600x900",
  //         text: "어서오세요 환영합니다1",
  //       },
  //       {
  //         id: 2,
  //         img: "https://source.unsplash.com/user/erondu/1600x900",
  //         text: "어서오세요 환영합니다2",
  //       },
  //       {
  //         id: 3,
  //         img: "https://source.unsplash.com/user/erondu/1600x900",
  //         text: "어서오세요 환영합니다3",
  //       },
  //       {
  //         id: 4,
  //         img: "https://source.unsplash.com/user/erondu/1600x900",
  //         text: "어서오세요 환영합니다4",
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <Content>
        <ListCard data={listData}></ListCard>
      </Content>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { listData: state };
};

export default connect(mapStateToProps)(Main);
