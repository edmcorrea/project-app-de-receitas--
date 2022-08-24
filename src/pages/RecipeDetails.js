import React from 'react';
import { connect } from 'react-redux';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeDetails() {
  return (
    <>
      <ShareButton />
      {/* Botão de favoritar precisa receber via props o produto atual */}
      <FavoriteButton currentProduct={ currentProduct } />
    </>
  );
}

export default connect()(RecipeDetails);
