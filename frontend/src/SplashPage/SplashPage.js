

import NavBar from "./NavBar";
import "../../css/SplashPage.css"

const SplashPage = () => {
  return (
    <div className="splash-page">
      <div className="nav">
        <NavBar />
      </div>
       
        <div className="splash-footer">
          <span>Nottingham Exchange</span>
        </div>
    </div>
  );
};

export default SplashPage;