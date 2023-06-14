import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { parse } from "fast-xml-parser";
import { useLocalStorage } from "react-use";
import PodcastDetailsLeftPanel from "../podcast-details-left-panel/PodcastDetailsLeftPanel";
import "./EpisodeDetails.scss";
import { LoadingContext } from "../../contexts/NavigationContext";
import dayjs from "dayjs";

const EpisodeDetails = () => {
  const { podcastId } = useParams();
  const episodeId = decodeURIComponent(useParams().episodeId);

  const { loading, setLoading } = useContext(LoadingContext);

  const [podcastData, setPodcastData] = useLocalStorage(
    `podcast-${podcastId}`,
    null
  );
  const [episodeData, setEpisodeData] = useLocalStorage(
    `episode-${episodeId}`,
    null
  );

  const [lastFetchedPodcastTime, setLastFetchedPodcastTime] = useLocalStorage(
    `lastFetchedPodcast-${podcastId}`,
    null
  );
  const [lastFetchedEpisodeTime, setLastFetchedEpisodeTime] = useLocalStorage(
    `lastFetchedEpisode-${episodeId}`,
    null
  );

  useEffect(() => {
    const fetchPodcastData = async () => {
      setLoading(true);
      try {
        if (
          !podcastData ||
          !lastFetchedPodcastTime ||
          dayjs().diff(dayjs(lastFetchedPodcastTime), "day") > 0
        ) {
          const response = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              `https://itunes.apple.com/lookup?id=${podcastId}`
            )}`
          );
          const data = response.data.results[0];
          setPodcastData(data);
          setLastFetchedPodcastTime(dayjs().toISOString());
        }
      } catch (error) {
        console.error("Failed to fetch podcast details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastData();
  }, [
    podcastId,
    podcastData,
    lastFetchedPodcastTime,
    setLastFetchedPodcastTime,
    setLoading,
    setPodcastData,
  ]);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      setLoading(true);
      try {
        if (
          !episodeData ||
          !lastFetchedEpisodeTime ||
          dayjs().diff(dayjs(lastFetchedEpisodeTime), "day") > 0
        ) {
          const feedResponse = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              podcastData.feedUrl
            )}`
          );
          const feedData = parse(feedResponse.data);
          const rssEpisodes = feedData.rss.channel.item || [];
          const episode = rssEpisodes.find(
            (episode) => episode.guid === episodeId
          );
          setEpisodeData(episode);
          setLastFetchedEpisodeTime(dayjs().toISOString());
        }
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, [
    podcastData,
    episodeData,
    episodeId,
    setEpisodeData,
    lastFetchedEpisodeTime,
    setLoading,
    loading,
    setLastFetchedEpisodeTime,
  ]);

  if (loading || !podcastData || !episodeData) return null;

  return (
    <div className="podcast-details-container wc">
      <PodcastDetailsLeftPanel
        podcastId={podcastId}
        podcastData={podcastData}
      />
      <div className="right-panel box-shadow-standard episode-details-right">
        <h2>{episodeData?.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: episodeData?.description }} />
        <audio controls>
          <source src={episodeData?.enclosure.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default EpisodeDetails;
