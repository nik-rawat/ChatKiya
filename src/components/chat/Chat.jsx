import { useEffect, useState, useRef } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { db } from "../../lib/firebase"
import { onSnapshot, doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore"
import { useChatStore } from "../../lib/chatStore"
import { useUserStore } from "../../lib/userStore"
import upload from "../../lib/upload"


const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const { chatId, user, isCurrentUserBlocked, isReceiverBocked } = useChatStore();
  const { currentUser } = useUserStore();
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
    uploading: false,
  })

  const endRef = useRef(null);
  useEffect(()=> {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  },[]);

  useEffect(()=> {
    const unSub = onSnapshot(doc(db, "chats", chatId),
     res => {
      setChat(res.data())
    });

    return () => {unSub();}
  },[chatId]);
  
  // console.log(chat);

  const handleEmoji = e => {
    setText(prev => prev+e.emoji);
  }

  const handleImg = e => {
    if(e.target.files[0]){
        setImg({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
            uploading: false,
        }) 
        console.log(img.file)
    }
  }

  const handleSend = async () => {
    if(text.trim() === "" && !img.file) return;
    let imgUrl = null;

    try{
      const chatRef = doc(db, "chats", chatId);
      const chatSnapshot = await getDoc(chatRef);

      if(img.file){
        setImg(prev => ({...prev, uploading: true}));
        imgUrl = await upload(img.file); 
        setImg(prev => ({...prev, uploading: false}));
      }

    if (!chatSnapshot.exists()) {
      // If the document doesn't exist, create it
      await setDoc(chatRef, {
        messages: [
          {
            senderId: currentUser.id,
            text,
            createdAt: new Date(),
            ...(imgUrl && {img: imgUrl}),
          },
        ],
      });
    } else {
      // If the document exists, update it
      await updateDoc(chatRef, {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}), 
        }),
      });
    }

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async id => {

        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if(userChatsSnapshot.exists()){
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(chat => chat.chatId === chatId);
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true: false;
          userChatsData.chats[chatIndex].UpdatedAt = Date.now();
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats          
          });
        }
      })
    }catch(err){
      console.error(err);
    }

    setImg({
      file: null,
      url: "",
      uploading: false,
    });
    setText(""); 
  }


  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png" }alt="" />
          <div className="texts">
            <span>{user.username}</span>
            <p>Online 1 min ago</p>
          </div>
        </div>
        <div className="icons">
          <img src="/phone.png" alt="" />
          <img src="/video.png" alt="" />
          <img src="/info.png" alt="" />
        </div>
      </div>

      <div className="center">
        { chat?.messages?.map(message => (
            <div className={`message ${message.senderId === currentUser.id ? 'own' : ''}`} key={message?.createdAt}>
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                {(message.text !== "" ) && <p>{message.text}</p>}
              </div>
              {message.senderId !== currentUser.id ? <img src={user.avatar ||"./avatar.png"} alt=""/> : <></>}
              {/* <span>{message.createdAt}</span> */}
            </div>
        ))
        }
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
              {img.uploading && (
                <div className="loading-indicator">
                  <span>Uploading...</span>
                </div>
              )}
              {(text.trim() !== "" || img.uploading) && <p>{text}</p>}<br />
              {!img.uploading && text.trim() === "" && <span>Click send to send image</span>}
            </div>
            {/* <span>{new Date().toLocaleTimeString()}</span> */}
          </div>
        )}

        <div ref={endRef}></div>

      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="/img.png" alt="" />
          </label>
          <input type="file" onChange={handleImg} id="file" style={{display: "none"}}/>
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>

        <input type="text" placeholder={(isCurrentUserBlocked || isReceiverBocked) ? "You cannot send messages" :"Type here..."} value={text} onChange={e=> setText(e.target.value)} disabled= {isCurrentUserBlocked || isReceiverBocked}/>
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen (prev => !prev)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled= {isCurrentUserBlocked || isReceiverBocked}>Send</button>
      </div>
    </div>
  )
}

export default Chat