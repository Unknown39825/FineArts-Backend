import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../../../Base/Base";
import { isAuthenticated } from "../../auth";
import "../../style.css";

export default function EventUpdate(props) {
  const { id } = useParams();

  const { token } = isAuthenticated();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [EventPost, setEvent] = useState({
    img: "",
    title: "",
    link: "",
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
        const res = await axios.get(`/api/event/${id}`, config);
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

  const postEvent = async () => {
    if (id !== "new") {
      try {
        const res = await axios.put(`/api/event/${id}`, EventPost, config);
        if (res.msg) toast(res.msg);
        console.log(res);
        setCreated(true);
        toast("Event Updated");
      } catch (err) {
        console.log(err.response.data);
        toast("Unable to update ");
      }
    } else {
      try {
        const res = await axios.post(`/api/event`, EventPost, config);
        if (res.msg) toast(res.msg);
        setCreated(true);
        if (res.msg) toast(res.msg);

        toast("event  created");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      EventPost.title.trim() !== "" &&
      EventPost.link.trim() !== "" &&
      EventPost.img.trim() !== ""
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
            {id !== "new" ? "update" : "create"} Event
          </h1>

          <div className="form">
            <form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">
              <div>
                <label>
                  <b>Title of Event</b>
                </label>
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={EventPost.title}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>

              <div>
                <label>
                  <b>Event Link</b>
                </label>
                <input
                  className="input"
                  type="text"
                  name="link"
                  value={EventPost.link}
                  onChange={handleChange}
                  placeholder=""
                />
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
                {id !== "new" ? "update" : "create"}Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
}
