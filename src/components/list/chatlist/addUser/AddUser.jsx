import "./addUser.css"

const AddUser = () => {
  return (
    <div className='addUser'>
        <form action="">
            <input type="text" placeholder="username" name="username" />
            <button>Search</button>
        </form>
        <div className="user">
            <img src="./avatar.png" alt="" />
            <span>Keshav</span>
        </div>
        <button>Add User</button>
    </div>
  )
}

export default AddUser