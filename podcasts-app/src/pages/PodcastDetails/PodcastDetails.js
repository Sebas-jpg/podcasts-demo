import { useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { parse } from "fast-xml-parser";
import dayjs from "dayjs";
import "./PodcastDetails.scss";
import PodcastEpisodesPanel from "../../components/podcast-episodes-panel/PodcastEpisodesPanel";
import PodcastDetailsLeftPanel from "../../components/podcast-details-left-panel/PodcastDetailsLeftPanel";
import { LoadingContext } from "../../contexts/NavigationContext";

const PodcastDetails = () => {
  const { id } = useParams();

  const { loading, setLoading } = useContext(LoadingContext);

  const [podcastData, setPodcastData] = useLocalStorage(`podcast-${id}`, null);
  const [episodes, setEpisodes] = useLocalStorage(`episodes-${id}`, []);

  const [lastFetchedPodcastTime, setLastFetchedPodcastTime] = useLocalStorage(
    `lastFetchedPodcastTime-${id}`,
    null
  );
  const [lastFetchedEpisodesTime, setLastFetchedEpisodesTime] = useLocalStorage(
    `lastFetchedEpisodesTime-${id}`,
    null
  );

  useEffect(() => {
    const fetchPodcastData = async () => {
      if (
        !podcastData ||
        dayjs().diff(dayjs(lastFetchedPodcastTime), "day") > 0
      ) {
        try {
          const response = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              `https://itunes.apple.com/lookup?id=${id}`
            )}`
          );

          const data = response.data.results[0];
          setPodcastData(data);
          setLastFetchedPodcastTime(dayjs().toISOString());
        } catch (error) {
          console.error("Failed to fetch podcast details:", error);
        }
      }
    };

    fetchPodcastData();
  }, [
    id,
    podcastData,
    lastFetchedPodcastTime,
    setLastFetchedPodcastTime,
    setPodcastData,
  ]);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      if (
        (podcastData && !episodes?.length) ||
        dayjs().diff(dayjs(lastFetchedEpisodesTime), "day") > 0
      ) {
        try {
          const feedResponse = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              podcastData.feedUrl
            )}`
          );

          const feedData = parse(feedResponse.data);
          const rssEpisodes = feedData.rss.channel.item || [];
          setEpisodes(rssEpisodes);
          setLastFetchedEpisodesTime(dayjs().toISOString());
        } catch (error) {
          console.error("Failed to fetch episodes:", error);
        }
      }
    };

    fetchEpisodesData();
  }, [
    podcastData,
    episodes,
    lastFetchedEpisodesTime,
    setLastFetchedPodcastTime,
    setLoading,
    setPodcastData,
    setEpisodes,
    setLastFetchedEpisodesTime,
  ]);

  useEffect(() => {
    if (podcastData && episodes?.length) {
      setLoading(false);
    }
  }, [podcastData, episodes, setLoading, setLastFetchedEpisodesTime]);

  if (loading || !episodes?.length) return null;

  return (
    <div className="podcast-details-container wc">
      <PodcastDetailsLeftPanel podcastId={id} podcastData={podcastData} />
      <PodcastEpisodesPanel episodes={episodes} podcastId={id} />
    </div>
  );
};

export default PodcastDetails;
