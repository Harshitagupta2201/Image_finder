import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fabric } from "fabric";
import "./AddCaption.css";
import { saveAs } from "file-saver";

const AddCaption = () => {
  const [caption, setCaption] = useState("Add Caption");
  const [input, setInput] = useState("");
  const [showshape, setShowshape] = useState(false);
  const location = useLocation();
  console.log(location.state);
  const src = location.state;
  function handlechange(e) {
    setInput(e.target.value);
  }
  function handleclick() {
    setCaption(input);
    setInput("");
  }
  const downloadImage = () => {
    saveAs(src, "image.jpg");
  };
  function addShape(shapeType) {
    setShowshape(true);
    var shape;
    switch (shapeType) {
      case "triangle":
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: "red",
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          left: 200,
          top: 200,
          radius: 50,
          fill: "blue",
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          left: 300,
          top: 300,
          width: 150,
          height: 100,
          fill: "green",
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 400, y: 400 },
            { x: 450, y: 450 },
            { x: 400, y: 500 },
            { x: 350, y: 450 },
          ],
          {
            fill: "yellow",
          }
        );
        break;
      default:
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 500,
          height: 500,
          fill: "white",
        });
    }
    return shape;
  }
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 700,

      height: 700,

      backgroundColor: "white",
    });

    canvas.renderAll();

    fabric.Image.fromURL(
      src,

      (img) => {
        {
          img.width = 400;

          img.height = 400;

          img.top = 150;

          img.left = 150;
        }

        canvas.add(img);

        canvas.renderAll();
      }
    );
    var text = new fabric.Text(caption, { left: 230, top: 30 });
    canvas.add(text);
    canvas.setActiveObject(text);

    if (showshape === true) canvas.add(addShape());
  }, [src, caption, showshape]);

  //console.log(url);
  return (
    <div className="container">
      <div>
        <canvas
          id={"canvas"}
          style={{ border: "2px solid black", marginLeft: "2rem" }}
        ></canvas>
      </div>
      <div
        style={{
          marginLeft: "5rem",
          height: "20rem",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <input
            type="text"
            onChange={(e) => handlechange(e)}
            value={input}
            style={{
              height: "2.3rem",
              border: "2px solid black",
              borderRadius: "10px 10px 10px 10px",
            }}
          />{" "}
          <button onClick={handleclick} className="btn btn-danger">
            Addcaption
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ color: "white" }}>
            Click On Any Shape to Change the shape of Canvas:
          </div>
          <div className="shape">
            <button
              onClick={() => addShape("triangle")}
              className="btn btn-light"
            >
              Triangle
            </button>
            <button
              onClick={() => addShape("circle")}
              className="btn btn-light"
            >
              Circle
            </button>
            <button
              onClick={() => addShape("rectangle")}
              className="btn btn-light"
            >
              Rectangle
            </button>
            <button
              onClick={() => addShape("polygon")}
              className="btn btn-light"
            >
              Polygon
            </button>
          </div>
        </div>
        <div>
          <button className="btn btn-success" onClick={downloadImage}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCaption;
