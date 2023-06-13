import "./PodcastCard.scss";

const PodcastCard = ({ podcast }) => {
    return (
        <div className="card">
            <img src={podcast['im:image'][2].label} alt={podcast.title.label} />
            <h2>{podcast.title.label}</h2>
            <p className="author">Author: {podcast['im:artist'].label}</p>
        </div>
    );
};

export default PodcastCard;
