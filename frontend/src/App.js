import React,{Component} from "react";
import InputSlider from "./components/InputSlider/InputSlider";
import SourceButton from "./components/SourceButton/SourceButton";
import NewsBox from "./components/NewsBox/NewsBox";
import "./App.css";

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      sources: [
        "CNN",
        "HackerNews",
        "BBC",
        "The Wall Street Journal",
        "New York Times"
      ],
      activeButtons: ["CNN","BBC","New York Times"],
      maxActiveButtons: 3
    };
  }

  buttonClickHandler(name) 
  {
    console.log(this.state.activeButtons)
    if(this.state.activeButtons.includes(name)) 
    {
      this.setState(
        {
          activeButtons: this.state.activeButtons.filter((val,_) => val!==name)
        });
    }
    else 
    {
      if(this.state.activeButtons.length<this.state.maxActiveButtons) 
      {
        this.setState({activeButtons: this.state.activeButtons.push(name)});
      }
      else 
      {
        console.log("Button attempted to be added above limit");
      }
    }
  }

  render()
  {
    return (
      <div className="App">
        <div className="App-header">
          <h2>News Summariser</h2>
        </div>
        <div id="slider-row">
          <InputSlider
            title="# of Sentences per Article"
            xmax="5"
          ></InputSlider>
          <div id="generate-container">
            <button id="generate">Generate</button>
          </div>
          <InputSlider title="# of Articles per Source" xmax="3"></InputSlider>
        </div>
        <div id="sources-row">
          {this.state.sources.map(name =>
          {
            return (
              <SourceButton
                source={name}
                className={
                  this.state.activeButtons.includes(name)
                    ? "selected"
                    :"unselected"
                }
                onClick={() => this.buttonClickHandler(name)}
                key={name}
              />
            );
          })}
        </div>
        <div id="news-row">
          <NewsBox />
          <NewsBox />
          <NewsBox />
        </div>
      </div>
    );
  }
}

export default App;
