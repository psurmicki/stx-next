import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FindBookForm from './FindBookForm.jsx';

export default function BookFormModal({ modalIsOpen, onSubmit, setModalOpen }) {
  // const {
  //   buttonLabel,
  //   className
  // } = props;

  const toggle = () => setModalOpen(!modalIsOpen);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
    <div>
      <Button
        color="danger"
        onClick={toggle}
      >
        {/* buttonLabel */}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggle}
      // className={/* className */}
      >
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
        >
          {'Modal title'}
        </ModalHeader>
        <ModalBody>
          <FindBookForm onSubmit={onSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}></Button>{' '}
          <Button color="secondary" onClick={toggle}>{'Cancel'}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}