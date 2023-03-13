import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import Drafticon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeoepleAticon from "@mui/icons-material/PeopleAlt";
import AppIcon from "@mui/icons-material/Apps";
import CreateIcon from "@mui/icons-material/Create";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessicon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarOptions from "./SidebarOptions";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function SideBar() {
  const [channels, loading, error] = useCollection(db.collection("room"));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Chat</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOptions Icon={InsertCommentIcon} Title="Threads" />
      <SidebarOptions Icon={InboxIcon} Title="Mentions & Reactions " />
      <SidebarOptions Icon={Drafticon} Title="Saved Icon" />
      <SidebarOptions Icon={BookmarkBorderIcon} Title="Channel Browser" />
      <SidebarOptions Icon={PeoepleAticon} Title="People & User Group" />
      <SidebarOptions Icon={AppIcon} Title="Apps" />
      <SidebarOptions Icon={FileCopyIcon} Title="File Browser" />
      <SidebarOptions Icon={ExpandLessicon} Title="Show Less" />
      <hr />
      <SidebarOptions Icon={ExpandMoreIcon} Title="Channels" />
      <hr />
      <SidebarOptions Icon={AddIcon} addChannelOptions Title="Add Channel" />

      {channels?.docs.map((doc) => (
        <SidebarOptions key={doc.id} id={doc.id} Title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default SideBar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
    background-color: #49274b;
  }
`;
