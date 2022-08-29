// import React from 'react';
// import { connect } from 'react-redux';
// import { setFilterAll, setType } from '../redux/actions';

// function FilterButtons() {
//   return (
//     <section className="filter-btns">
//       <button
//         className="btn-type-meals"
//         type="button"
//         data-testid="filter-by-all-btn"
//         onClick={ () => setFilterAll(true) }
//       >
//         All
//       </button>
//       <button
//         className="btn-type-meals"
//         type="button"
//         data-testid="filter-by-food-btn"
//         onClick={ () => {
//           setFilterAll();
//           setType('food');
//         } }
//       >
//         Food
//       </button>
//       <button
//         className="btn-type-meals"
//         type="button"
//         data-testid="filter-by-drink-btn"
//         onClick={ () => {
//           setFilterAll();
//           setType('drink');
//         } }
//       >
//         Drinks
//       </button>
//     </section>
//   );
// }

// const mapDispatchToProps = (dispatch) => ({
//   setFilterAll: () => dispatch(setFilterAll()),
//   setType: (payload) => dispatch(setType(payload)),
// });

// export default connect(null, mapDispatchToProps)(FilterButtons);
