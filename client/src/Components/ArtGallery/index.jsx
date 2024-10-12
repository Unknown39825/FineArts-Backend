import axios from "axios";
import { useEffect, useState } from "react";
import Base from "../Base/Base";
import "./photo.css";
import PhotoCard from "./PhotoCard";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
export default function ArtGallery() {
  const [wall, setWall] = useState([]);
  const [back, setBack] = useState([]);
  const [artg, setArtg] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
    try {
      const artworks = await axios.get("/api/artwork");
      if (artworks.data) {
        const wallPainting = artworks.data.filter((d) => d.category === "wall");
        const artGallery = artworks.data.filter((d) => d.category === "Art");
        const backDrop = artworks.data.filter((d) => d.category === "Back");

        setWall(wallPainting);
        setArtg(artGallery);
        setBack(backDrop);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Base title="artGallery">
      <header>
        <h1>Art Gallery</h1>
        <p>finearts</p>
      </header>

      <main>
        {/* <a name=" wall "></a> */}
        <h1 className="title">Wall Paintings</h1>
        <div className="imgcont">
          {wall.map((data) => (
            <PhotoCard key={data._id} data={data} />
          ))}
        </div>
        {/* <a name="back"></a> */}

        <h1 className="title">backdrop</h1>
        <div className="imgcont">
          {back.map((data) => (
            <PhotoCard key={data._id} data={data} />
          ))}
        </div>
        {/* <a name="gal"></a> */}
        <h1 className="title">Art Gallery</h1>

        <div className="imgcont">
          {artg.map((data) => (
            <PhotoCard key={data._id} data={data} />
          ))}
        </div>

        <div className="container" style={{ margin: "30px auto" }}>
          <Link to="/artwork/new">
            <button className="btn">Post your Artwork</button>
          </Link>
        </div>
      </main>
    </Base>
  );
}
