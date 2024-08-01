import { useState } from "react"
import "./chatList.css"
import AddUser from "./addUser/AddUser"

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  return (
    <div className='ChatList'>
      <div className="search">
        <div className="searchBar">
          <img src="search.png" alt="" />
          <input type="text" placeholder="Search"/>
        </div>
        <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add" onClick={ () =>
          setAddMode(prev => !prev)
        } />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span className="userName">Kartik Rana</span>
          <p>Aur Bhai kaisa hai?</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span className="userName">Keshav</span>
          <p>Aaja Bhai BGMI me</p>
        </div>
      </div>
      
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span className="userName">Pawas Panday</span>
          <p>Assignment bhej dena toh OS ka</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span className="userName">Prakhar Chaubey</span>
          <p>Isme Registration kar le</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  )
}

export default ChatList