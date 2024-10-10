import React, { useEffect, useState } from "react";
import Backdrop from "../BackDrop";
import Base from "../Base/Base";
import WhoAreWe from "./WhoAreWe";
import "./style.css";
import WhatWeDo from "./WhatWeDo";
import ThingWeOrganise from "./ThingWeOrganise";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Hompage() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [events, setEvents] = useState([]);

  const FetchData = async () => {
    try {
      const events = await axios.get("/api/event");
      if (events.data) {
        setEvents(events.data);
      }

      const workshops = await axios.get("/api/workshop");
      if (workshops.data) {
        setWorkshop(workshops.data);
      }

      const homecards = await axios.get("/api/homecard");
      if (homecards.data) {
        setCards(homecards.data);
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
    <Base>
      <Backdrop />
      <WhoAreWe />
      <WhatWeDo cards={cards} />
      <ThingWeOrganise events={events} workshop={workshop} />
    </Base>
  );
}
