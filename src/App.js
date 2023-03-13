import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Chat from "./Chat";
import SideBar from "./Components/SideBar";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Components/Login";
import Spinner from "react-spinkit";
function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Apploading>
        <ApploadingContents>
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </ApploadingContents>
      </Apploading>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header user={user} />
            <AppBody>
              <SideBar />
              <Routes>
                <Route path="/" element={<Chat />} />
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const Apploading = styled.div`
  display: grid;
  place-items: centre;
  height: 100vh;
  width: 100%;
`;
const ApploadingContents = styled.div`
  text-align: center;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
