import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";

import "./App.css";

const App = () => {
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  const [filteredResults, setFilteredResults] = useState([]);

  const [search, setSearch] = useState("");

  const loadProducts = (skip, limit, title) => {
    getProducts(skip, limit, title).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.products);
        setSize(data.size);
        setSkip(0);
        setLimit(50);
      }
    });
  };

  useEffect(() => {
    loadProducts(skip, limit, search);
  }, []);

  const loadMore = () => {
    let toSkip = skip + limit;
    getProducts(toSkip, limit, search).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setFilteredResults([...filteredResults, ...data.products]);
        setSize(data.size);
        if (data.size < limit) {
          setSkip(0);
        } else {
          setSkip(toSkip);
        }
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div>
          <hr />
          <button onClick={loadMore} className="btn btn-warning mb-4">
            Load more
          </button>
        </div>
      )
    );
  };

  const handleSearch = (search) => (e) => {
    setSkip(0);
    setLimit(50);
    loadProducts(0, limit, search);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <p className="lead">Search Products By Title</p>
      </div>
      <div className="container">
        <input
          className="input-text"
          type="text"
          name="search"
          onChange={handleInput}
        />
        <input
          type="button"
          value="Search"
          className="button"
          onClick={handleSearch(search)}
        />
      </div>
      <br />
      <hr />
      <div className="grid-wrapper">
        {filteredResults && filteredResults.length > 0 ? (
          filteredResults.map((product, i) => (
            <div className="box zone" key={i}>
              <Card product={product} />
            </div>
          ))
        ) : (
          <div className="div-center">
            <div className="box-center">No Products Found✌</div>
          </div>
        )}
      </div>
      <div className="load-center">{loadMoreButton()}</div>
    </div>
  );
};

export default App;
