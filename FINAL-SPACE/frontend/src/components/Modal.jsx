// ModalBox.js
import React from 'react';
import Modal from 'react-modal';
import '../components/Modal.css'; // Create a CSS file for styling

Modal.setAppElement('#root'); // Set the app element for accessibility reasons

const ModalBox = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <button className="close-button" onClick={onRequestClose}>×</button>
      <div className="modal-content">
        {/* Content goes here */}
      </div>
    </Modal>
  );
};

export default ModalBox;
