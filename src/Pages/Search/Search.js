import React from "react";
import "./Search.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [images, setImages] = useState([]);
  const [showimages, setShowimages] = useState(false);
  const navigate = useNavigate();
  function handlechange(e) {
    setInput(e.target.value);
  }
  function Addcaption(url) {
    navigate("/addcaption", { state: url });
  }
  useEffect(() => {
    let API_KEY = "36714825-8c3cad5a9699caba52d27a8dd";
    let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      input
    )}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setImages(res.data.hits);
      })
      .catch((err) => console.log(err));
  }, [input]);
  return (
    <div>
      <div className="Header">
        <div className="Information">
          <div>Name: Harshita Gupta</div>
          <div>Email: harshitag2201@gmail.com</div>
        </div>
        <div
          style={{ fontSize: " 4rem", marginLeft: "15rem", fontFamily: "Lora" }}
        >
          Image Finder
        </div>
      </div>
      <div className="Search">
        <input
          type="text"
          className="input"
          onChange={(event) => handlechange(event)}
          placeholder="Enter the text here...."
        />
        <button className="btn btn-info" onClick={() => setShowimages(true)}>
          Search
        </button>
      </div>
      <div className="ImageContainer">
        {images.slice(0, 4).map((ele, i) =>
          showimages ? (
            <div className="card" key={i}>
              {" "}
              <img src={ele.webformatURL} alt="" />
              <button
                className="btn btn-primary"
                onClick={() => {
                  Addcaption(ele.webformatURL);
                }}
              >
                Add Caption
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Search;
