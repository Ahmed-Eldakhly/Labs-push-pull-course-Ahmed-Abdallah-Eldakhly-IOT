import './App.css';
import React, { useState , useEffect, useMemo } from 'react';
import io from 'socket.io-client'
import { Widget, addResponseMessage } from 'react-chat-widget'

import 'react-chat-widget/lib/styles.css'

const BASE_URL = "http://localhost:3002"

const socket = io(BASE_URL)

const WS = () => {

  socket.on("connect", () => {
    console.log("the socetId is" , socket.id);  
  });
  const [userId , setUserId] = useState("")
  const [groupId , setGroupId] = useState("")
  const handleNewUserMessage = (message) => {
    console.log(userId, groupId)
    console.log(message)
    let obj
    if(userId != ""){
      obj = {
        userId: userId,
        msg: message
      }
    }
    else if(groupId  != "")
    {
      obj = {
        group: groupId,
        msg: message
      }
    }
    else
        obj = message
    socket.emit('message' , obj)
  }
  useEffect(() => {
    socket.on('new-message' , (message) => {
      console.log("this is the message" , message)
        addResponseMessage(message);
    })
} , [])

  return (
    <>
      <Widget
        handleNewUserMessage  = {handleNewUserMessage}
      />
      <div>
        <label for="userId"> User Id </label>
        <input id="userId" type="textbox" onChange={(event) => {
          setUserId(event.target.value)
        }} onFocus={(event) => {
          setGroupId("")
        }} value={userId}></input>
      </div>

      <div>
        <label for="groupId"> Group Id </label>
        <input id="groupId" type="textbox" onChange={(event) => {
          setGroupId(event.target.value)
        }} onFocus={(event) => {
          setUserId("")
        }} value={groupId}></input>
      </div>
    </>
  )
}

function App() {
  return (
      <WS></WS>
  );
}

export default App;


