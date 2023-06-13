import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { parse } from "fast-xml-parser";
import "./PodcastDetails.scss";
import { formatDate } from "../../helpers/helpers";

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcastData, setPodcastData] = useLocalStorage(`podcast-${id}`, null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!podcastData) {
          const response = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              `https://itunes.apple.com/lookup?id=${id}`
            )}`
          );

          const data = response.data.results[0];
          setPodcastData(data);

          const feedResponse = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              data.feedUrl
            )}`
          );
          console.log("feedResponse", feedResponse);
          const feedData = parse(feedResponse.data);
          console.log("feedData", feedData);
          const rssEpisodes = feedData.rss.channel.item || [];
          setEpisodes(rssEpisodes);
        }
      } catch (error) {
        console.error("Failed to fetch podcast details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, podcastData, setPodcastData]);

  return isLoading ? (
    <p>Loading...</p>
  ) : podcastData ? (
    <div className="podcast-details-container">
      <div className="left-panel box-shadow-standard">
        <img src={podcastData.artworkUrl600} alt={podcastData.trackName} />
        <div className="track-details">
          <b>{podcastData.trackName}</b>
          <p>by {podcastData.artistName}</p>
        </div>
        {/* TODO: lookup where the actual description is */}
        <p className="description">
          <span>Description:</span>
          {podcastData.collectionName}
        </p>
      </div>
      <div className="right-panel">
        <div className="box-shadow-standard episodes-count">
          <p>Episodes: {episodes.length}</p>
        </div>
        <div className="box-shadow-standard episodes-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes?.map((episode, index) => (
                <tr key={index}>
                  <td>{episode.title}</td>
                  <td>{formatDate(episode.pubDate)}</td>
                  <td>{episode["itunes:duration"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Podcast not found.</p>
  );
};

export default PodcastDetails;
