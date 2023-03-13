import styled from "styled-components";

function Message({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer>
      <img
        src={userImage}
        alt=""
        // style={{
        //   borderRadius: "20px",
        //   height: "30px",
        // }}
      />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p
          style={{
            display: "flex",
          }}
        >
          {message}
        </p>
      </MessageInfo>

      {/* <div
        style={{
          width: "10%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={userImage}
            alt=""
            style={{
              height: "60%",
              width: "20%",
              borderRadius: "100%",
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }}
      >
        <h4
          style={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          {user}{" "}
          <span
            style={{
              color: "grey",
              fontWeight: "300",
              marginLeft: "4px",
              fontSize: "10px",
              display: "flex",
              alignSelf: "flex-end",
            }}
          >
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p
          style={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          {message}
        </p>
      </div> */}
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  > img {
    height: 40px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 > span {
    color: grey;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
