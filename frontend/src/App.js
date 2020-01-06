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
        "Wall Street Journal",
        "New York Times",
      ],
      activeButtons: ["CNN","BBC"],
      maxActiveButtons: 3,
      currentNewsObjects: []
    };
  }

  buttonClickHandler(name) 
  {
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
        let newActives=this.state.activeButtons.slice(0);
        newActives.push(name);
        this.setState({activeButtons: newActives});
      }
      else 
      {
        console.log("Button attempted to be added above limit");
      }
    }
  }

  generateClickHandler()
  {
    let baseUrl='http://localhost:8000/api/articles/';
    let url=this.buildUrl(baseUrl,this.state.activeButtons)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {this.setState({currentNewsObjects: data})})
      .catch((error) => console.log(error));
  }


  buildUrl(baseUrl,sources)
  {
    let formattedSources=sources.map(name => "source=".concat(name.toLowerCase(),"&"));
    return baseUrl.concat("?",formattedSources.join(''))
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
            <button id="generate" onClick={() => this.generateClickHandler()}>Generate</button>
          </div>
          <InputSlider title="# of Articles per Source" xmax="3"></InputSlider>
        </div>
        <div id="sources-row">
          {this.state.sources.map(name =>
          {
            return (
              <button
                source={name}
                className={this.state.activeButtons.includes(name)
                  ? "selected"
                  :"unselected"
                }
                onClick={() => this.buttonClickHandler(name)}
                key={name}
              >{name}</button>
            );
          })}
        </div>
        <div id="news-row">
          {
            this.state.currentNewsObjects.map((obj,_) => 
            {
              return (
                <NewsBox source={obj.source} articleText={obj.text} title={obj.title} articleLink={obj.link} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
