import React from "react";
import ImageMapper from "react-img-mapper";
import image from "../../images/Background-image.jpg";
import areas from './areas.json';

const Mapper = (props) => {
  
  const MAP = {
    name: "my-map",
    // GET JSON FROM BELOW URL AS AN EXAMPLE
    areas:areas,
  };

  return (
    <ImageMapper
      src={image}
      map={MAP}
        responsive={true}
        parentWidth={window.innerWidth}
    />
  );
};

export default Mapper;
