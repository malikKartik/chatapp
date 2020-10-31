import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateRoom from "./containers/createRoom/CreateRoom";
import JoinRoom from "./containers/joinRoom/JoinRoom";
import OnBoarding from "./containers/onBoarding/OnBoarding";
import Button from "@material-ui/core/Button";
import MyRooms from "./containers/myRooms/MyRooms";
import ChatRoom from "./containers/chatRoom/ChatRoom";
import MainContainer from "./hoc/MainContainer";
import Home from "./containers/home/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("token") !== null
  );

  const logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Router>
          <MainContainer setIsLoggedIn={setIsLoggedIn}>
            {isLoggedIn ? (
              <></>
            ) : (
              // <nav style={{ display: "flex", flexDirection: "row" }}>
              //   <Link to="/createRoom">
              //     <Button>Create Room</Button>
              //   </Link>
              //   <br />

              //   <Link to="/joinRoom">
              //     <Button>Join Room</Button>
              //   </Link>
              //   <br />

              //   <Link to="/rooms">
              //     <Button>Joined Rooms</Button>
              //   </Link>
              //   <br />
              //   <Button onClick={logout}>Logout</Button>
              // </nav>
              <Redirect to="/"></Redirect>
            )}

            <Switch>
              <Route exact path="/">
                {!isLoggedIn ? (
                  <OnBoarding setIsLoggedIn={setIsLoggedIn}></OnBoarding>
                ) : (
                  <Home></Home>
                )}
              </Route>
              <Route path="/createRoom">
                <CreateRoom></CreateRoom>
              </Route>
              <Route path="/joinRoom">
                <JoinRoom></JoinRoom>
              </Route>
              <Route path="/chat/:roomId">
                <ChatRoom></ChatRoom>
              </Route>
              <Route path="/rooms">
                <MyRooms></MyRooms>
              </Route>
            </Switch>
          </MainContainer>
        </Router>
      ) : (
        <Router>
          <Redirect to="/"></Redirect>

          <Switch>
            <Route exact path="/">
              {!isLoggedIn ? (
                <OnBoarding setIsLoggedIn={setIsLoggedIn}></OnBoarding>
              ) : null}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
