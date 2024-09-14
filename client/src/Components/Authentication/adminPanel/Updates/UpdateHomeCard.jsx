import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Base from '../../../Base/Base';
import { isAuthenticated } from '../../auth';
import '../../style.css'

export default function HomeCardUpdate(props) {
    let id = props.match.params.id;
    console.log(id);

    const { token } = isAuthenticated();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [EventPost, setEvent] = useState({
        imglink: '',
        title: '',
        seemore: '',
        desc:''
    });

    const [created, setCreated] = useState(false);

    const [Data, setData] = useState(undefined);

    useEffect(() => {
        const dataFetch = async () => {
            const { token } = isAuthenticated();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            try {
                const res = await axios.get(`/api/homecard/${id}`, config);
                // console.log("hello");
                
                if (res.data) {
                    setEvent(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (id !== "new")
            dataFetch();
    }, [id]);

    const uploadImage = async event => {
        const files = event.target.files;
        await setData(files[0]);
    }

    const Submit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        await data.append('file', Data);
        data.append('upload_preset', 'ynw2jbip');
        const res = await fetch("https://api.cloudinary.com/v1_1/dbgmmzvlh/image/upload",
            {
                method: 'POST',
                body: data
            });
        const file = await res.json();
        // await setUrl(file.secure_url);
        await setEvent({
            ...EventPost,
            imglink: file.secure_url
        })
    }

    const handleChange = (e) => {
        setEvent({
            ...EventPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent = async () => {
        if (id !== "new") {
            try {
                const res = await axios.put(`/api/homecard/${id}`, EventPost, config);
                if(res.msg)
                toast(res.msg);
                setCreated(true);
                toast('Homecard Updated');
            } catch (err) {
                console.log(err.response.data);
                toast("unble to update the data");
            }
        } else {
            try {
                const res = await axios.post(`/api/homecard`, EventPost, config);
                if(res.msg)
                toast(res.msg);
                setCreated(true);
                toast('Homecard  created');
            } catch (err) {
                console.log(err.response.data);
                toast("unble to update the data");
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (EventPost.title.trim() !== "" && EventPost.imglink.trim() !== "" && EventPost.desc.trim() !== "") {
            postEvent();
        } else {
            toast("Homecard details are  empty");
        }
    }

    if (created) {
        return <Navigate to="/admin"></Navigate>
    }

    return (
        <Base>
            <div className="cont">
                <div>
                    <h1 className="bg-dark m-2 text-white p-2 rounded">{id !== "new" ? ("update") : ("create")}  HomeCard</h1>

                    <div className="form">
                        <form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">
                            <div controlId="">
                                <label><b>Title of Event</b></label>
                                <input className="input" type="text" name="title" value={EventPost.title} onChange={handleChange} placeholder="" />
                            </div>

                            <div controlId="">
                                <label><b>Seemore Link</b></label>
                                <input className="input" type="text" name="seemore" value={EventPost.seemore} onChange={handleChange} placeholder="" />
                            </div>

                            <div controlId="">
                                <label><b>Description</b></label>
                                <input className="input" type="text" name="desc" value={EventPost.desc} onChange={handleChange} placeholder="" />
                            </div>

                            <div controlId="">
                                <label><b>Image Preview</b></label>
                                <br />
                                <img src={EventPost.imglink} height="100" width="auto" alt={EventPost.title} />
                            </div>

                            <div className="test">
                                <input type="file" name="file" placeholder="upload a image" onChange={uploadImage} />
                                <br />
                                <button className="btn" onClick={Submit}>upload</button>

                            </div>

                            <button variant="primary" className="btn" onClick={onSubmit}>{id !== "new" ? ("update") : ("create")}HomeCard</button>

                        </form>
                    </div>
                </div>
            </div>
        </Base>
    )
}
