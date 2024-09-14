import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../auth";
import '../../style.css'
import { toast } from "react-toastify";

const HomeCardTable = () => {
  const [Event, setEvent] = useState([]);
  const [created, setCreated] = useState(false);
  const { token } = isAuthenticated();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const DeleteEvent = async (event) => {
    let id = event.target.value;
    //  console.log(event.target.value);
    
    try {
      const res = await axios.delete(`/api/homecard/${id}`, config);
      if (res.data) {
        toast("Deleted Successfully");
        
        await setCreated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      toast("unable to delete");
    }
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get(`/api/homecard`);

        if (res.data) {
          setEvent(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    dataFetch();
  }, []);

  if (created) {
    window.location.reload();
  }

  return (
    <>
      <div className="cont">

        <h1>Home Card Table</h1>
        <table>
          <thead>
            <tr>

              {/* <th>id</th> */}
              <th>Image</th>
              <th>Title</th>
              <th>Link</th>
              {isAuthenticated() && <th>update</th>}
              {isAuthenticated() && <th>delete</th>}
            </tr>
          </thead>
          <tbody>
            {Event.map((event) => {
              return (<tr>
                {/* <td>{event._id}</td> */}
                <td> <img src={event.imglink} height="30px" width="auto" alt="" /> </td>
                <td>{event.title}  </td>
                <td><a className="btn" href={event.link} role="button">Link</a></td>

                {isAuthenticated() &&
                  <td><Link to={{ pathname: '/homecard/' + event._id }}><button className="btn">update</button></Link></td>}

                { isAuthenticated() && <td><button onClick={DeleteEvent} className="btn" value={event._id}> Delete </button> </td>
                }
              </tr>)
            })
            }
          </tbody>
        </table>

        {isAuthenticated() && <Link to={{ pathname: '/homecard/new' }}>            <button className="btn">add Homecard</button>          </Link>}

      </div>

    </>
  );
}

export default HomeCardTable;
