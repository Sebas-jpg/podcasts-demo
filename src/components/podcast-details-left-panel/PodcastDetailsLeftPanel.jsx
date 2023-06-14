import { useNavigate } from "react-router-dom";

const PodcastDetailsLeftPanel = ({ podcastId, podcastData }) => {
  const navigate = useNavigate();

  return (
    <div className="left-panel box-shadow-standard">
      <img
        className="clickable"
        onClick={() => navigate(`/podcast/${podcastId}`)}
        src={podcastData?.artworkUrl600}
        alt={podcastData?.trackName}
      />
      <div
        onClick={() => navigate(`/podcast/${podcastId}`)}
        className="track-details clickable"
      >
        <b>{podcastData?.trackName}</b>
        <p>by {podcastData?.artistName}</p>
      </div>
      <p className="description">
        <span>Description:</span>
        {podcastData?.collectionName}
      </p>
    </div>
  );
};

export default PodcastDetailsLeftPanel;
