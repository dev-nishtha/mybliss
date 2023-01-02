import React, { useState } from "react";
import "./App.css";
import Catalogue from "./components/Catalogue";
function App() {
  const PRODUCTS = require("./content/products.json");
  const [product, setProduct] = useState(PRODUCTS);
  const [option, setOption] = useState("featured");
  const handleChange = (e) => {
    if (e.target.value === "color") {
      setOption("color");
    } else if (e.target.value === "price") {
      setOption("price");
    } else setOption("featured");
  };
  return (
    <div className="App">
      <div id="div-one">
        <div id="page-description">
          <h2 id="heading">10mm Glass Beads</h2>
          <h4 className="header h-one">
            Explore our 10mm Glass Beads collection
          </h4>
          <h4 className="header h-one">
            Use these beads for Jewellery making, embroidery, accessories,
            dreamcatchers, home decor, macrame and other art and craft projects
          </h4>
        </div>
        <div className="container drop-down">
          <div className="row" id="d-one">
            <p className="header h-two">FILTER BY</p>
            <select>
              <option value="all">All</option>
            </select>
          </div>
          <div className="row" id="d-two">
            <p className="header h-two">SORT BY</p>
            <select onChange={handleChange}>
              <option value="featured">Featured</option>
              <option value="color">Color</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>
      <div id="div-two">
        <Catalogue products={product} option={option} />
      </div>
    </div>
  );
}

export default App;
