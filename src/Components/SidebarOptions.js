import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import {useDispatch} from "react-redux" 
import { enterRoom } from "../features/appSlice";

function SidebarOptions({ Icon, Title, addChannelOptions, id }) {
  const dispatch =useDispatch();


  const addChannel = () => {
    const channelName = prompt("Please enter the Channel Name");

    if (channelName) {
      db.collection("room").add({
        name: channelName,
      });
    }

  };

  const selectChannel = () => {
    if(id){
      dispatch(enterRoom({
        roomId:id
      }))
    }



  };

  return (
    <SidebarOptionsContainer
      onClick={addChannelOptions ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{Title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {Title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionsContainer>
  );
}

export default SidebarOptions;

const SidebarOptionsContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
