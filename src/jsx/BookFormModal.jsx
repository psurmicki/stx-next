import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import FindBookForm from './FindBookForm.jsx';
import '../styles/BookFormModal.css';

const BookFormModal = ({ modalIsOpen, onSubmit, setModalOpen }) => {
  const toggle = () => setModalOpen(!modalIsOpen);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggle}
      >
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
          className='modal-header'
        >
          {'Find book'}
        </ModalHeader>
        <ModalBody className='modal-body'>
          <FindBookForm onSubmit={onSubmit} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default BookFormModal;