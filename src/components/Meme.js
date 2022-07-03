import picture from "../images/picture.png";
// import memesData from "../memesData";
import { useState, useEffect } from "react";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    topTextHeight: 5,
    topTextWidth: 100,
    topTextPosition: 5,
    showTopTextConrols: true,
    bottomText: "",
    bottomTextHeight: 5,
    bottomTextWidth: 100,
    bottomTextPosition: 5,
    randomImage: "",
  });
  const [topTextConrols, setTopTextConrols] = useState(false);
  const [bottomTextConrols, setBottomTextConrols] = useState(false);
  const [allMemes, setallMemes] = useState([]);
  const [previousImage, setPreviousImage] = useState("");

  const topTextStyle = {
    top: `${meme.topTextHeight}%`,
    maxWidth: `${meme.topTextWidth}%`,
    left: `${meme.topTextPosition}%`,
  };
  const bottomTextStyle = {
    bottom: `${meme.bottomTextHeight}%`,
    maxWidth: `${meme.bottomTextWidth}%`,
    left: `${meme.bottomTextPosition}%`,
  };

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setallMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage(imgUrl = "") {
    if (imgUrl) {
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: imgUrl,
      }));
      setPreviousImage("");
    } else {
      if (meme.randomImage) setPreviousImage(meme.randomImage);
      const index = Math.floor(Math.random() * allMemes.length);
      const url = allMemes[index].url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: url,
      }));
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div className="meme--body form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Top text"
          value={meme.topText}
          name="topText"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={meme.bottomText}
          name="bottomText"
          onChange={handleChange}
        />
      </div>
      <button onClick={() => getMemeImage()}>
        Get a new meme image
        <span>
          <img src={picture} className="button--image" alt="gallery icon" />
        </span>
      </button>
      {previousImage && (
        <button id="second-button" onClick={() => getMemeImage(previousImage)}>
          Get previous meme image
        </button>
      )}
      {meme.randomImage && (
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="meme" />
          <h2 style={topTextStyle} className="meme--text top">
            {meme.topText}
          </h2>
          <h2 style={bottomTextStyle} className="meme--text bottom">
            {meme.bottomText}
          </h2>
        </div>
      )}
      {meme.topText && meme.randomImage && (
        <>
          <button
            id="text-controls"
            onClick={() => setTopTextConrols((prev) => !prev)}
          >
            {topTextConrols ? "Hide " : "Show "} Top Text Controls
          </button>
          {topTextConrols && (
            <div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={meme.topTextHeight}
                  onChange={handleChange}
                  className="slider"
                  id="myRange"
                  name="topTextHeight"
                />
                <output id="rangevalue">
                  Top Text Height: {meme.topTextHeight}%
                </output>
              </div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={meme.topTextWidth}
                  onChange={handleChange}
                  className="slider"
                  id="myRange"
                  name="topTextWidth"
                />
                <output id="rangevalue">
                  Top Text Width: {meme.topTextWidth}%
                </output>
              </div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={meme.topTextPosition}
                  onChange={handleChange}
                  className="slider"
                  id="myRange"
                  name="topTextPosition"
                />
                <output id="rangevalue">
                  Top Text Position: {meme.topTextPosition}%
                </output>
              </div>
            </div>
          )}
        </>
      )}
      <br />
      {meme.bottomText && meme.randomImage && (
        <>
          <button
            id="text-controls"
            onClick={() => setBottomTextConrols((prev) => !prev)}
          >
            {bottomTextConrols ? "Hide " : "Show "} Bottom Text Controls
          </button>
          {bottomTextConrols && (
            <div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={meme.bottomTextHeight}
                  onChange={handleChange}
                  className="slider"
                  id="myRange"
                  name="bottomTextHeight"
                />
                <output id="rangevalue">
                  Bottom Text Height: {meme.bottomTextHeight}%
                </output>
              </div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={meme.bottomTextWidth}
                  onChange={handleChange}
                  className="slider"
                  id="myRange"
                  name="bottomTextWidth"
                />
                <output id="rangevalue">
                  Bottom Text Width: {meme.bottomTextWidth}%
                </output>
              </div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={meme.bottomTextPosition}
                  onChange={handleChange}
                  className="slider"
                  id="myRange"
                  name="bottomTextPosition"
                />
                <output id="rangevalue">
                  Bottom Text Position: {meme.bottomTextPosition}%
                </output>
              </div>
            </div>
          )}
        </>
      )}
      <br />
    </div>
  );
}

export default Meme;
