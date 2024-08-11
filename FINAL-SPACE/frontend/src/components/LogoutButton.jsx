import { useAuthContext } from "../context/AuthContext";
import useLogout from "../Hooks/useLogout";
const LogoutButton = () => {
	const { loading, logout } = useLogout();
     const {Authuser}=useAuthContext();
	return (
		// <>
		<div className='mt-auto'>
          <span>Welcome {Authuser.username}</span> 
		  {/* <span>USER ID:{Authuser._id}</span> */}
			{!loading ? (
				
				<button className='w-6 h-6 text-white cursor-pointer' onClick={logout} >
					LOGOUT
					</button>
			) : (
				<span className='loading loading-spinner'></span>
			)}
			{/* </> */}
		</div>
	);
};
export default LogoutButton;