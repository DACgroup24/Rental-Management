import { useState } from "react"
import { useDispatch } from "react-redux"
import {login} from '../../redux/authSlice'
import { useNavigate } from "react-router-dom"
export default function LoginComp(){
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [msg,setMessage]=useState("")
    const dispatch=useDispatch(); //hoook function
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const reqoptions={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                password:password
        })
    }
    fetch("http://localhost:9000/login",reqoptions) //9000
    .then(resp=>{
        if(resp.status===200){
            return resp.json();
        }
        else if(resp.status===404)
            {
                setMessage("Wrong ID/Password")
                return{};
            }
    })
    .then(data=>{
        console.log(JSON.stringify(data))
        dispatch(login({
            user:data.user,
            token:data.token
        }))
        if(data.user.role===1){ //navigate to admin dashboard
            navigate("/admin")
        }
        else if(data.user.role===2){//navigate to user dashboard
            navigate("/user")
        }
         else if(data.user.role===3){//navigate to user dashboard
            navigate("/landlord", {currentUser: data.user})
        }

    })
}
    return(
        <>
        <h1>Login Form</h1>
        <form>
            Enter username:
            <input type="text" name="username" value={username} onChange={(e)=>{setUserName(e.target.value)}} />
            <br/>
            Enter Password:
            <input type="text" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <br/>
            <input type="submit" value="Login" onClick={handleSubmit}/>
        </form>
       
        </>
    )

}