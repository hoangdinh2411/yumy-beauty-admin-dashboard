import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
// import DashBoardLayout from "pages/homeLayout";
import Routing from "routing";
import { MessageBox } from "components";
import { useSelector,useDispatch } from "react-redux";
import  messageAction  from 'store/message/actions'

function App() {
  const authInStorage = JSON.parse(localStorage.getItem("authInfo"));
  const navigate = useNavigate();
  const messageFromServer = useSelector((state) => state.message);
  const [showMessageBox, setShowMessageBox] = useState(false)
  const dispatch = useDispatch()
  //check if user is logged in
  useEffect(() => {
    if (authInStorage?.token) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);
  

  // Show alert message box 
  useEffect(() => {
    if(messageFromServer){
      setShowMessageBox(true)
      dispatch(messageAction.clearMessage())
    }

    const timeout = setTimeout(()=>{
      setShowMessageBox(false)
    },1500)
    return ()=>{
      clearTimeout(timeout)
      
    }
  
  }, [messageFromServer]);

  return (
    <>
      <div className="body">
        <div className="main glass-primary">
          <Routing />
        </div>
      </div>
      <MessageBox show={showMessageBox} messageFromServer={messageFromServer}/>
    </>
  );
}

export default App;
