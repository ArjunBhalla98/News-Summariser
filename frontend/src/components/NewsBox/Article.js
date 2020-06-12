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
            <div className="article-inner">
                <h3>{this.props.title}</h3>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default Article;
