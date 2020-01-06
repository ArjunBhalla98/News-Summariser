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
            <a href={this.props.link}>
                <div id="article-container">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.text}</p>
                </div>
            </a>
        );
    }
}

export default Article;
