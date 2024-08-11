import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './context/AuthContext';
import { useEffect, useState } from 'react';
; // Import the ModalBox component
import LogoutButton from './components/LogoutButton';
import ModalBox from './components/Modal';
// import Modal from './components/Modal.js' // Create this component
// import Modal from './Modal'; // Create this component
function App() {
  // const [showModal, setShowModal] = useState(false);
  // const toggleModal = () => {
  //   setShowModal(prev => !prev);
  // };
  const {Authuser}=useAuthContext();
  // {console.log(Authuser,"from App.jsx")}
  return (
    // <div className={`App ${showModal ? 'blurred' : ''}`}>
    // <button onClick={toggleModal}>Show Modal</button>
    
    // {showModal && <Modal onClose={toggleModal} />}
    <div className='App'>
       <Routes>
			<Route path="/" element={Authuser?
       <LogoutButton/>
        :<Navigate to={'/login'}/>} />
			<Route path="/login" element={Authuser?<Navigate to='/' />:<Login/>} />
			<Route path="/signup" element={Authuser?<Navigate to='/' />:<Signup/>} />
		  </Routes>
      <ToastContainer />
      {/* <ModalBox
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      /> */}
    </div>
  )
}

export default App
