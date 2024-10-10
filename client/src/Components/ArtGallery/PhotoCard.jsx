import React from "react";
import logo from "../../images/logo.png";

export default function PhotoCard({
  data = {
    artist: "aman",
    img: logo,
  },
}) {
  return (
    <div className="box" data-aos="zoom-in" data-aos-delay="200">
      <img src={data.img} alt="image1" />
      <span className="label"> {data.artist}</span>
    </div>
  );
}
