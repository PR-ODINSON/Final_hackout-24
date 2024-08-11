import { useState  } from "react";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
  const [loading, setloading] = useState(false);
  const {Authuser,setAuthuser}=useAuthContext()
  const signup=async({fullName,username,password,confirmPassword})=>{
    const success=handleInputErrors({fullName,username,password,confirmPassword});
    if(!success){
        return;
    }
    setloading(true);
    try {
        const res=await fetch('http://localhost:5000/api/auth/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword}),
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.getItem('space-user',JSON.stringify(data))
        // console.log(data);
        setAuthuser(data);
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setloading(false);
    }
  }
  return{loading,signup};
}

export default useSignup
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
    if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}