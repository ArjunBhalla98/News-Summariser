import React,{Component} from "react";
import {Helmet} from "react-helmet"
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
    const apiKey="bc221b9c1ead4225bc0d22010397469d";
    let baseUrl='https://newsapi.org/v2/top-headlines?sources=';
    let url=this.buildUrl(baseUrl,this.state.activeButtons,apiKey)
    fetch(url)
      .then((response) => response.json())
      .then((response) => this.getObjectsFromResponse(response))
      .then((data) => {this.setState({currentNewsObjects: data})})
      .catch((error) => console.log(error));
  }

  getObjectsFromResponse(response)
  {
    let finalObjects=[];
    let sourceCount={}
    let articles=response.articles

    for(let articleId in articles)
    {
      let article=articles[articleId]
      let source=article.source.name;
      if(!(source in sourceCount))
      {
        sourceCount[source]=1;
      }
      else
      {
        sourceCount[source]=sourceCount[source]+1;
      }

      if(sourceCount[source]<=3)
      {
        let title=article.title;
        let text="No text body available for this article."

        try
        {
          text=article.description;
        }
        catch(err)
        {
          console.log(err)
        }

        let link=article.url;

        finalObjects.push({"title": title,"text": text,"source": source,"link": link})
      }
    }

    return finalObjects
  }


  buildUrl(baseUrl,sources,apiKey)
  {
    let sourceString=sources.map((x,i,y) => x.toLowerCase().replace(/ /g,"-")).join();
    return baseUrl.concat(sourceString,"&apiKey=",apiKey)
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

  TITLE="News Summariser";

  render()
  {
    return (
      <div className="App">
        <Helmet><title>{this.TITLE}</title></Helmet>
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
            this.generateNewsBoxes()
          }
        </div>
        <div id="generate-container">
          <button id="generate" onClick={() => this.generateClickHandler()}>Generate</button>
        </div>
      </div>
    );
  }
}

export default App;
