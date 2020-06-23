import React,{Component} from 'react';
import './NewsBox.css';
import Article from './Article';


class NewsBox extends Component
{
    constructor(props)
    {
        super(props);
    }

    goToLink(link)
    {
        window.open(link,"_blank");
    }

    render()
    {
        return (
            <div className="newsbox">
                <h2>{this.props.source.toUpperCase()}</h2>
                {
                    this.props.items.map((obj,_) =>
                    {
                        return (
                            <div className="article-container" onClick={() => this.goToLink(obj.link)}>
                                <Article title={obj.title} text={obj.text} link={obj.link} />
                            </div>
                        )
                    }
                    )}
            </div>
        );
    }
}

export default NewsBox;
