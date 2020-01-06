import React,{Component} from 'react';
import './NewsBox.css';
import Article from './Article';


class NewsBox extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id="article-container">
                <h2>{this.props.source.toUpperCase()}</h2>
                <Article title={this.props.title} text={this.props.articleText} link={this.props.articleLink} />
            </div>
        );
    }
}

export default NewsBox;
