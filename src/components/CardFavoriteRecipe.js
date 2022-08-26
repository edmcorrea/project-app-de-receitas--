// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

// const copy = require('clipboard-copy');

// const COPY_MESSAGE_TIMEOUT = 2000;

// function CardFavoriteRecipe(favorite, index) {
//   console.log(favorite);
//   const [showMessage, setShowMessage] = useState(false);

//   const { id, type, image, name, category, nationality, alcoholicOrNot } = favorite;

//   const handleShareButton = (typeShare, idShare) => {
//     const hRef = `http://localhost:3000/${typeShare}s/${idShare}`;
//     copy(hRef);
//     setShowMessage(true);
//     setTimeout(() => setShowMessage(false), COPY_MESSAGE_TIMEOUT);
//   };

//   const removeFavoriteRecipe = (favoriteRecipes, idremove) => {
//     const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== idremove);
//     localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
//     setStateFavoriteRecipes(newFavoriteRecipes);
//   };

//   const handleFavoriteRecipeButton = (idRemove) => {
//     const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
//     removeFavoriteRecipe(favoriteRecipes, idRemove);
//   };

//   return (
//     <div className="card-favorite-recipe">
//       <Link
//         to={ `/${type}s/${id}` }
//       >
//         <img
//           src={ image }
//           alt={ name }
//           className="horizontal-image"
//           data-testid={ `${index}-horizontal-image` }
//         />
//         <div>
//           <p
//             data-testid={ `${index}-horizontal-top-text` }
//           >
//             {(type === 'food')
//               ? `${nationality} - ${category}`
//               : alcoholicOrNot}

//           </p>
//           <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
//         </div>
//       </Link>
//       { showMessage && <h4 className="copy-message">Link copied!</h4> }
//       <section>
//         <button
//           type="button"
//           className="btn-type-meals"
//           onClick={ () => handleShareButton(type, id) }
//         >
//           <img
//             data-testid={ `${index}-horizontal-share-btn` }
//             src={ shareIcon }
//             alt="Share"
//           />
//         </button>
//         <button
//           type="button"
//           className="btn-type-meals"
//           data-testid={ `${index}-horizontal-favorite-btn` }
//           onClick={ () => handleFavoriteRecipeButton(id) }
//           src={ blackHeartIcon }
//         >
//           <img
//             src={ blackHeartIcon }
//             alt="Favorite"
//           />
//         </button>
//       </section>
//     </div>
//   );
// }

// CardFavoriteRecipe.propTypes = {
//   alcoholicOrNot: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   nationality: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
// };

// export default CardFavoriteRecipe;
