import React, { useEffect, useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import decode from "jwt-decode";

// import DashBoardLayout from "pages/homeLayout";
import Routing from "routing";
import { MessageBox } from "components";
import { useSelector, useDispatch} from "react-redux";
import messageAction from "store/message/actions";
import { signOut } from 'utils/services';

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authInfo"))
  );
  const navigate = useNavigate();
  const location = useLocation();
  const messageFromServer = useSelector((state) => state.message);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const dispatch = useDispatch();
  //check if user is logged in

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);
  //Kiem tra, neu token het han , thi se tu dong log out

  useEffect(() => {
    const token = user?.token;
    if (token) {
      //ma hoa token
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
            signOut(dispatch,navigate)
            setUser(null)
      }
    }

    setUser(JSON.parse(localStorage.getItem("authInfo")))
    return () => {};
  }, [location]);

  // Show alert message box
  useEffect(() => {
    if (messageFromServer) {
      setShowMessageBox(true);
      dispatch(messageAction.clearMessage());
    }

    const timeout = setTimeout(() => {
      setShowMessageBox(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [messageFromServer]);

  return (
    <>
      <div className="body">
        <div className="main">
          <div className="grid wide ">
            <Routing auth={user}/>
          </div>
        </div>
      </div>
      <MessageBox show={showMessageBox} messageFromServer={messageFromServer} />
    </>
  );
}

export default App;
