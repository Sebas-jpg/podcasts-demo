import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "react-use";
import Filter from "../../components/filter/Filter";
import "./Home.scss";
import { LoadingContext } from "../../contexts/NavigationContext";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import dayjs from "dayjs";

const Home = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);

  const [data, setData] = useLocalStorage("podcastData", null);
  const [lastFetchedTime, setLastFetchedTime] = useLocalStorage(
    "lastFetchedTime",
    null
  );
  const [filter, setFilter] = useState("");

  const filteredData = data?.filter(
    (item) =>
      item.title.label.toLowerCase().includes(filter.toLowerCase()) ||
      item["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (
        !data ||
        !lastFetchedTime ||
        dayjs().diff(dayjs(lastFetchedTime), "day") > 0
      ) {
        const result = await axios.get(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        setData(result.data.feed.entry);
        setLastFetchedTime(dayjs().toISOString());
      }
      setLoading(false);
    };
    fetchData();
  }, [data, setData, setLoading, loading, lastFetchedTime, setLastFetchedTime]);

  if (loading || !data) return null;

  return (
    <div className="wc">
      <Filter setFilter={setFilter} count={filteredData?.length} />
      <div className="podcast-grid">
        {filteredData?.map((podcast) => (
          <PodcastCard
            onClick={() =>
              navigate(`/podcast/${podcast.id.attributes["im:id"]}`)
            }
            key={podcast.id.attributes["im:id"]}
            podcast={podcast}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
