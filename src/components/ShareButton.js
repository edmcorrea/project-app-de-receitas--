import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
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
    <>
      { showMessage && <p className="copy-message">Link copied!</p> }
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => handleShareButton() }
        className="share-and-favorite-buttons"
      >
        <img src={ shareIcon } alt="Share" />
      </button>
    </>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ShareButton;
