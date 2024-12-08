import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../../../Base/Base";
import { isAuthenticated } from "../../auth";
import "../../style.css";

export default function PhotoUpdate(props) {
  const { id } = useParams();

  const { token } = isAuthenticated();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [EventPost, setEvent] = useState({
    img: "",
    artist: "",
    category: "",
  });

  const [created, setCreated] = useState(false);

  const [Data, setData] = useState(undefined);

  useEffect(() => {
    const dataFetch = async () => {
      const { token } = isAuthenticated();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const res = await axios.get(`/api/artwork/${id}`, config);
        // console.log("hello");

        if (res.data) {
          setEvent(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id !== "new") dataFetch();
  }, [id]);

  const uploadImage = async (event) => {
    const files = event.target.files;
    await setData(files[0]);
  };

  const Submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    await data.append("file", Data);
    data.append("upload_preset", "ynw2jbip");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbgmmzvlh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    // await setUrl(file.secure_url);
    await setEvent({
      ...EventPost,
      img: file.secure_url,
    });
  };

  const handleChange = (e) => {
    setEvent({
      ...EventPost,
      [e.target.name]: e.target.value,
    });
  };

  console.log(EventPost);

  const postEvent = async () => {
    if (id !== "new") {
      try {
        const res = await axios.put(`/api/artwork/${id}`, EventPost, config);
        if (res.msg) toast(res.msg);
        console.log(res);
        setCreated(true);
        toast("Photo Updated");
      } catch (err) {
        toast("Unable to update the Data");
        console.log(err.response.data);
      }
    } else {
      try {
        const res = await axios.post(`/api/artwork`, EventPost, config);
        if (res.msg) toast(res.msg);
        setCreated(true);
        if (res.msg) toast(res.msg);

        toast("photo created");
      } catch (err) {
        console.log(err.response.data);
        toast("unble to update the data");
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      EventPost.img.trim() !== "" &&
      EventPost.artist.trim() !== "" &&
      EventPost.category.trim() !== ""
    ) {
      postEvent();
    } else {
      toast("Event details are  empty");
    }
  };

  if (created) {
    return <Navigate to="/admin"></Navigate>;
  }

  return (
    <Base>
      <div className="cont">
        <div>
          <h1 className="bg-dark m-2 text-white p-2 rounded">
            {id !== "new" ? "update" : "create"} Photo
          </h1>

          <div className="form">
            <form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">
              <div>
                <label>
                  <b>Artist</b>
                </label>
                <input
                  className="input"
                  type="text"
                  name="artist"
                  value={EventPost.artist}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>

              <div>
                <label>
                  <b>Category</b>
                </label>
                <select
                  name="category"
                  value={EventPost.category}
                  onChange={handleChange}
                >
                  <option>select</option>
                  <option value="wall">Wall painting</option>
                  <option value="Art">Art Gallery</option>
                  <option value="Back">BackDrop</option>
                </select>
              </div>

              <div>
                <label>
                  <b>Image Preview</b>
                </label>
                <br />
                <img
                  src={EventPost.img}
                  height="100"
                  width="auto"
                  alt={EventPost.title}
                />
              </div>

              <div className="test">
                <input
                  type="file"
                  name="file"
                  placeholder="upload a image"
                  onChange={uploadImage}
                />
                <br />
                <button className="btn" onClick={Submit}>
                  upload
                </button>
              </div>

              <button variant="primary" className="btn" onClick={onSubmit}>
                {id !== "new" ? "update" : "create"}Photo
              </button>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
}
