import { useState } from "react"
// import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useLogin = () => {
 const [loading, setloading] = useState(false);
const{setAuthuser,Authuser}= useAuthContext();
 const login=async(username,password)=>{
    const success = handleInputErrors(username, password);
    if (!success) return;
    setloading(true);
    try {
     const res=await fetch('http://localhost:5000/api/auth/login',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
     })
     const data=await res.json();
     if(data.error){
        throw new Error(data.error)
     }
     localStorage.setItem('space-user',JSON.stringify(data));
     console.log(data);
     setAuthuser(data);
     console.log(Authuser);
     console.log("user logged in")
   } catch (error) {
    //  toast.error(error.message);
    console.log("error",error.message);
   }
   finally{
    setloading(false);
   }
 }
 return{loading,login};
}

export default useLogin

function handleInputErrors(username, password) {
	if (!username || !password) {
		// toast.error("Please fill in all fields");
        console.log("please fill all fields")
		return false;
	}

	return true;
}