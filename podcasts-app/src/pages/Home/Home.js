import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "react-use";
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import Header from "../../components/header/Header";
import Filter from "../../components/filter/Filter";
import "./Home.scss";

const Home = () => {
  const [data, setData] = useLocalStorage("podcastData", null);
  const [filter, setFilter] = useState("");

  const filteredData = data?.filter(
    (item) =>
      item.title.label.toLowerCase().includes(filter.toLowerCase()) ||
      item["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        const result = await axios.get(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        setData(result.data.feed.entry);
      }
    };
    fetchData();
  }, [data, setData]);

  return (
    <div className="home-container">
      <Header />
      <Filter setFilter={setFilter} count={filteredData?.length} />
      <div className="podcast-grid">
        {filteredData?.map((podcast) => (
          <PodcastCard key={podcast.id.attributes["im:id"]} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Home;
