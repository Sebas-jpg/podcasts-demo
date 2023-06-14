import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/NavigationContext";

const Header = () => {
  const navigate = useNavigate();
  const { loading } = useContext(LoadingContext);

  return (
    <header className="wc">
      <h3 className="clickable" onClick={() => navigate("/")}>
        Podcaster
      </h3>
      {loading && <div className="loading-dot"></div>}
    </header>
  );
};

export default Header;
