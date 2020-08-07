import React from "react";

const Card = ({ product }) => {
  return (
    <div className="cards-grid">
      <div className="card__body">
        <h4 className="card__head">{product.title}</h4>
        <hr />
        <div className="flex_space">
          <div className="card__title">
            <span className="badge badge-pill badge-dark">
              {product.subcategory}
            </span>
          </div>
          <div className="price">${product.price}</div>
        </div>
        <hr />
        <p className="card__description">Popularity - {product.popularity}</p>
        <hr />
        <br />
      </div>
    </div>
  );
};

export default Card;
