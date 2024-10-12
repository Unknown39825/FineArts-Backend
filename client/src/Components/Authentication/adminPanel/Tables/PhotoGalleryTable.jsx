import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import "../../style.css";

const PhotoGalleryTable = () => {
  const [Event, setEvent] = useState([]);
  const [created, setCreated] = useState(false);
  const { token } = isAuthenticated();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const DeleteEvent = async (event) => {
    let id = event.target.value;
    //  console.log(event.target.value);

    try {
      const res = await axios.delete(`/api/artwork/${id}`, config);
      if (res.data) {
        toast("Deleted Successfully");

        await setCreated(!created);
      }
    } catch (error) {
      toast("unable to delete");
    }
  };

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get(`/api/artwork`);

        if (res.data) {
          setEvent(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataFetch();
  }, [created]);

  return (
    <>
      <div className="cont">
        <h1>PhotoGallery</h1>
        <table>
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th>Image</th>
              <th>artist</th>
              <th>category</th>
              {token && <th>update</th>}
              {token && <th>delete</th>}
            </tr>
          </thead>
          <tbody>
            {Event.map((event) => {
              return (
                <tr>
                  {/* <td>{event._id}</td> */}
                  <td>
                    {" "}
                    <img
                      src={event.img}
                      height="30px"
                      width="auto"
                      alt=""
                    />{" "}
                  </td>
                  <td>{event.title} </td>
                  <td>{event.category} </td>

                  {token && (
                    <td>
                      <Link to={{ pathname: "/artwork/" + event._id }}>
                        <button className="btn">update</button>
                      </Link>
                    </td>
                  )}

                  {token && (
                    <td>
                      <button
                        onClick={DeleteEvent}
                        className="btn"
                        value={event._id}
                      >
                        {" "}
                        Delete{" "}
                      </button>{" "}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {token && (
          <Link to={{ pathname: "/artwork/new" }}>
            {" "}
            <button className="btn">add Photos</button>{" "}
          </Link>
        )}
      </div>
    </>
  );
};

export default PhotoGalleryTable;
