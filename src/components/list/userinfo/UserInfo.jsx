import "./userInfo.css"

const UserInfo = () => {
  return (
    <div className='UserInfo'>
      <div className="user">
        <img src="avatar.png" alt="" />
        <h2>Nik</h2>
      </div>
      <div className="icons">
        <img src="more.png" alt="more" />
        <img src="video.png" alt="video" />
        <img src="edit.png" alt="edit" />
      </div>
    </div>
  )
}

export default UserInfo