import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const COPY_MESSAGE_TIMEOUT = 2000;

function ShareButton() {
  const [showMessage, setShowMessage] = useState(false);

  const handleShareButton = () => {
    copy(window.location.href);
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
      >
        <img src={ shareIcon } alt="Share" />
      </button>
    </>
  );
}

export default ShareButton;
