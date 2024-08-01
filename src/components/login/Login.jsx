import { useState } from "react";
import "./login.css";
import { toast } from 'react-toastify';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const handleAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            }) 
            console.log(avatar.file)
        }
        
    }

    const handleLogin = e => {
        e.preventDefault() 
        toast.warn("warning")
        // toast.error("There is an error")
        // toast.success("You have successfully registered")
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome Back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password"/>
                    <button className="loginButton">Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>New Here? Create an account</h2>
                <form action="">
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload Profile Picture</label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password"/>
                    {/* <input type="password" placeholder="Confirm Password" name="conf-password"/> */}
                    <button className="loginButton">Register</button>
                </form>
            </div>
        </div>
    )
    }

export default Login;