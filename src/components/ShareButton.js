import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.png';
import '../styles/FavoriteAndShareButtons.css';

const copy = require('clipboard-copy');

const COPY_MESSAGE_TIMEOUT = 2000;

function ShareButton({ path, id }) {
  const [showMessage, setShowMessage] = useState(false);

  const handleShareButton = () => {
    copy(`http://localhost:3000/${path}/${id}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), COPY_MESSAGE_TIMEOUT);
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ () => handleShareButton() }
      className="share-and-favorite-buttons"
    >
      { showMessage && <p className="copy-message">Link copied!</p> }
      <img src={ shareIcon } alt="Share" />
    </button>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareButton;
