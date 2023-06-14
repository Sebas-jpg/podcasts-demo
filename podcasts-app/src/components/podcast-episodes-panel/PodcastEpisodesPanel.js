import { formatDate, formatDuration } from "../../helpers/helpers";
import { Link } from "react-router-dom";

export const PodcastEpisodesPanel = ({ episodes, podcastId }) => {
  return (
    <div className="right-panel">
      <div className="box-shadow-standard episodes-count">
        <p>Episodes: {episodes.length}</p>
      </div>
      <div className="box-shadow-standard episodes-table">
        <div className="scroll-container">
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
                  <td>
                    <Link
                      to={`/podcast/${podcastId}/episode/${encodeURIComponent(
                        episode.guid
                      )}`}
                    >
                      {episode.title}
                    </Link>
                  </td>
                  <td>{formatDate(episode.pubDate)}</td>
                  <td>{formatDuration(Number(episode["itunes:duration"]))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PodcastEpisodesPanel;
