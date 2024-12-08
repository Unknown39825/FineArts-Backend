import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import "../../style.css";
import { toast } from "react-toastify";

const EventTables = () => {
  const [Event, setEvent] = useState([]);
  //const [created, setCreated] = useState(false);
  const { token } = isAuthenticated();
  const [refresh, setRefresh] = useState(false);
  const auth = isAuthenticated();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const DeleteEvent = async (event) => {
    let id = event.target.value;
    //  console.log(event.target.value);

    try {
      const res = await axios.delete(`/api/event/${id}`, config);
      if (res.data) {
        toast("Deleted Successfully");

        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error.response);
      toast(`unable to delete ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get(`/api/event`);

        if (res.data) {
          setEvent(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataFetch();
  }, [refresh]);

  return (
    <>
      <div className="cont">
        <h1>Events</h1>
        <table>
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th>Image</th>
              <th>Title</th>
              <th>Link</th>
              {auth && <th>update</th>}
              {auth && <th>delete</th>}
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
                  <td>
                    <a className="btn" href={event.link} role="button">
                      Link
                    </a>
                  </td>

                  {auth && (
                    <td>
                      <Link to={{ pathname: "/event/" + event._id }}>
                        <button className="btn">update</button>
                      </Link>
                    </td>
                  )}

                  {auth && (
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

        {auth && (
          <Link to={{ pathname: "/event/new" }}>
            {" "}
            <button className="btn">add Event</button>{" "}
          </Link>
        )}
      </div>
    </>
  );
};

export default EventTables;
