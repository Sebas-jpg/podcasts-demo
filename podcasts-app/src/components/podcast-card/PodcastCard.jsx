import "./PodcastCard.scss";

const PodcastCard = ({ podcast, onClick }) => {
  return (
    <div className="card box-shadow-standard" onClick={onClick}>
      <img src={podcast["im:image"][2].label} alt={podcast.title.label} />
      <h2>{podcast.title.label}</h2>
      <p className="author">Author: {podcast["im:artist"].label}</p>
    </div>
  );
};

export default PodcastCard;
