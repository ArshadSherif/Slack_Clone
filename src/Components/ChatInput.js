import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, db } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

//2:25:37 in vid
function ChatInput({ ChannelName, ChannelId, chatref }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const SendMessage = (e) => {
    e.preventDefault(); //Prevent refresh of screen

    if (!ChannelId) {
      return false;
    }

    db.collection("room").doc(ChannelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatref?.current?.scrollIntoView({ behaviour: "smooth" });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder={`Message #${ChannelName}`}
        />
        <Button hidden type="submit" onClick={SendMessage}>
          Submit
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
