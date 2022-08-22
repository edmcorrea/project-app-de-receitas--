import React from 'react';
import { connect } from 'react-redux';

function RecipeinProgress() {
  return (
    <>
      <p> RecipeinProgress </p>
      <p> pra o lint não reclamar </p>
    </>
  );
}

export default connect()(RecipeinProgress);
