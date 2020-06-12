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
        "Associated Press",
        "Hacker News",
        "BBC News",
        "The Wall Street Journal",
        "The Times of India",
      ],
      activeButtons: ["Associated Press","BBC News","The Times of India"],
      maxActiveButtons: 3,
      currentNewsObjects: []
    };
  }

  componentDidMount()
  {
    this.generateClickHandler()
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
        let activePop=this.state.activeButtons.slice(0);
        activePop.pop();
        activePop.push(name)
        this.setState({activeButtons: activePop})
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

  generateNewsBoxes()
  {
    let sourceToObjList={}
    for(let i=0;i<this.state.currentNewsObjects.length;i++)
    {
      let item=this.state.currentNewsObjects[i]
      console.log(item)
      if(item.source in sourceToObjList)
      {
        sourceToObjList[item.source].push(item)
      }
      else
      {
        sourceToObjList[item.source]=[item]
      }
    }
    let return_val=Object.keys(sourceToObjList).map((key,_) =>
      <NewsBox source={key} items={sourceToObjList[key]} />)

    return return_val
  }

  render()
  {
    return (
      <div className="App">
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
        <div id="generate-container">
          <button id="generate" onClick={() => this.generateClickHandler()}>Generate</button>
        </div>
        <div id="news-row">
          {
            this.generateNewsBoxes()
          }
        </div>
      </div>
    );
  }
}

export default App;
