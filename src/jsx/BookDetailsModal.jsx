import React from 'react';
import {
  CardImg,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Row
} from 'reactstrap';
import ISO6391 from 'iso-639-1';
import nopic from '../images/nopic.png';

const BookDetailsModal = ({ modalIsOpen, setModalIsOpen, book }) => {
  const { authors, categories, description, language, pageCount, imageLinks, title } = book.volumeInfo;

  const toggle = () => setModalIsOpen((prevValue) => !prevValue);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  return (
    <div>
      <Modal
        size='m'
        isOpen={modalIsOpen}
        toggle={toggle}
      >
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
        >
          {title ? title : 'No title'}
        </ModalHeader>
        <ModalBody>
          <CardImg
            top
            width="100%"
            src={imageLinks ?
              imageLinks.thumbnail
              : nopic}
            alt={title}
          />
          <Row noGutters>
            <h5>
              <i><b>{authors ? authors.join(", ") : 'No authors'}</b></i>
            </h5>
          </Row>
          <Row noGutters>
            {categories ? `Categories: ${categories.join(", ")}` : 'No categories'}
          </Row>
          <Row noGutters>
            <p>{description ? `Full description: ${description}` : 'No description'}</p>
          </Row>
          <Row noGutters>
            <Col>
              {language ? `Language: ${ISO6391.getName(language)}` : ''}
            </Col>
            <Col>
              {pageCount ? `Number of pages: ${pageCount}` : ' '}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default BookDetailsModal;