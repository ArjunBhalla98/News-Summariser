import React, { Component } from 'react';
import InputSlider from './components/InputSlider/InputSlider';
import SourceButton from './components/SourceButton/SourceButton';
import NewsBox from './components/NewsBox/NewsBox';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>News Summariser</h2>
        </div>
        <div id="slider-row">
          <InputSlider title="# of Sentences per Article" xmax="5"></InputSlider>
          <div id="generate-container"><button id="generate">Generate</button></div>
          <InputSlider title="# of Articles per Source" xmax="3"></InputSlider>
        </div>
        <div id="sources-row">
          <SourceButton source="CNN" />
          <SourceButton source="HackerNews" />
          <SourceButton source="BBC" />
          <SourceButton source="New York Times" />
          <SourceButton source="Wall Street Journal" />
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
