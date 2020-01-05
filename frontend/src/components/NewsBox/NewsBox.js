import React, { Component } from 'react';
import './NewsBox.css';
import Article from './Article';


class NewsBox extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { source: this.props.source }
    // }

    render() {
        return (
            <div>
                <h2>News Source (e.g. CNN)</h2>
                <Article />
                <Article />
                <Article />
            </div>
        );
    }
}

export default NewsBox;
