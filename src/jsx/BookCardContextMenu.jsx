import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import '../styles/BookCardContextMenu.css';

const BookCardContextMenu = ({ id, handleBookDetailsModal }) => {
  return (
    <div>
      <ContextMenu id={id}>
        <MenuItem
          onClick={handleBookDetailsModal}
        >
          <i className="fas fa-info-circle" /> {'Click to see datails...'}
        </MenuItem>
      </ContextMenu>
    </div>
  );
}

export default BookCardContextMenu;