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
            <div class="newsbox">
                <h2>{this.props.source.toUpperCase()}</h2>
                {
                    this.props.items.map((obj,_) =>
                    {
                        return <Article title={obj.title} text={obj.text} link={obj.link} />
                    }
                    )}
            </div>
        );
    }
}

export default NewsBox;
