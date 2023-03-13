import React, { useRef } from "react";
import styled from "styled-components";
import StarBorderdOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "./features/appSlice";
import ChatInput from "./Components/ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import Message from "./Components/Message";
import { useEffect } from "react";

function Chat() {
  const chatref = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("room").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("room")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatref?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong># {roomDetails?.data().name} </strong>
              </h4>
              <StarBorderdOutlineIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlineIcon />
                #Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatref} />
          </ChatMessages>
          <ChatInput
            chatref={chatref}
            ChannelName={roomDetails?.data().name}
            ChannelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4.MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
    color: yellow;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 10px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
