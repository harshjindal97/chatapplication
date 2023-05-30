import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import "./body.css"
import './App.css';
import io from 'socket.io-client';

const sockets = io.connect("http://localhost:3001");

function App() {

  const [userName, setUserName] = useState("");
  const [Room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentMessagelist, setCurrentMessagelist] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: Room,
        author: userName,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await sockets.emit('send-message', messageData)
      setCurrentMessagelist((list) => [...list, messageData])
      setCurrentMessage("");
    }

  }

  useEffect(() => {
    sockets.on('receive-message', (data) => {
      console.log(data);
      setCurrentMessagelist((list) => [...list, data]);
    })
  }, [])

  const joinRoom = () => {
    if (userName !== "" && Room !== "") {
      sockets.emit('join-room', Room, userName);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg text-white bg-dark navposition">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="data:image/jpeg;base64,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" alt="Bootstrap" width="30" height="24" />
          </a>
          <a className="navbar-brand text-white" href="/">ChatApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/">Link</a>
              </li>

            </ul>
            <div className='navdiv'>
              <input className="form-control me-2" type="text" placeholder="enter your name" onChange={(event) => { setUserName(event.target.value) }} />
              <input className="form-control me-2" type="text" placeholder="join a room" onChange={(event) => { setRoom(event.target.value) }} />
              <button className="btn btn-outline-light " onClick={joinRoom}>join</button>
              {/* <button onClick={joinRoom}>join</button> */}
            </div>
          </div>
        </div>
      </nav>


      <div className="sidebar displayflex">
        <ul className="nav flex-column">
          <li className="nav-item textdesign">
            <a className="nav-link textdesign" href="/">Home</a>
          </li>
          <li className="nav-item textdesign">
            <a className="nav-link textdesign" href="/">About</a>
          </li>
          <li className="nav-item textdesign">
            <a className="nav-link textdesign" href="/">Services</a>
          </li>
          <li className="nav-item textdesign">
            <a className="nav-link textdesign" href="/">Contact</a>
          </li>

        </ul>
      </div>

      <div className="content">
        <div className='float_prop colours'>
          {currentMessagelist.map((content) => {
            return (<div className='abc' id={userName === content.author ? "msgright" : "msgleft"}>
              <div>{content.message}

              </div>
              <div className='textdate' >{content.time}  {content.author}</div>
            </div>

            )
          })}
          {/* <div className='msg-right'>hello</div> */}
          {/* <div className='msg-left'>hello</div> */}



          <div className="input-group mb-3 textbox">


            <input type="text" value={currentMessage}
              className="form-control" placeholder="Enter text" id="messageInp" onChange={(event) => { setCurrentMessage(event.target.value) }}
              onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }} />
            <button className="btn btn-primary" type="button" id="myButton" onClick={sendMessage}> &#9658;</button>


          </div>
        </div>

      </div>

    </>
  )
}

export default App;