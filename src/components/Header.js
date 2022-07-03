import trollFace from "../images/trollFace.png";

function Header() {
  return (
    <header>
      <nav>
        <div className="header--left">
          <img src={trollFace} className="header--image" alt="Troll Face" />
          <h2>Meme Generator</h2>
        </div>
        <p>Made with React✨</p>
      </nav>
    </header>
  );
}

export default Header;
