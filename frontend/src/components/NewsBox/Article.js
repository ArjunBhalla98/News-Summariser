import React,{Component} from 'react';
import './NewsBox.css';


class Article extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id="article-container">
                <h3>{this.props.title}</h3>
                <p>{this.props.text}</p>
                <a href={this.props.link} target="blank">Link</a>
            </div>
        );
    }
}

export default Article;
