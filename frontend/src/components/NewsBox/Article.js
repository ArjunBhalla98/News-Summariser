import React, { Component } from 'react';
import './NewsBox.css';


class Article extends Component {
    constructor(props) {
        super(props);
        this.state = { source: this.props.source }
    }

    render() {
        return (
            <a>
                <div id="article-container">
                    <h3>Article Title</h3>
                    <p>Article body summary:
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur massa in semper posuere. Maecenas blandit viverra arcu, et varius mi egestas et. Fusce egestas enim vel nulla rutrum dictum. Pellentesque nec ante eu augue egestas venenatis. Sed mauris elit, consectetur et diam in, tempor rutrum diam. Aliquam erat volutpat. Quisque eu sapien tellus. Vestibulum in ipsum lacinia, lacinia arcu vel, interdum est. Nullam molestie, nunc eu pellentesque condimentum, ex lacus dictum nisi, quis tincidunt ante purus non felis. Integer molestie, turpis vel sollicitudin posuere, eros ligula euismod velit, sed luctus justo odio non purus. Quisque venenatis, risus in auctor pretium, diam dolor tincidunt eros, ut suscipit purus sem et diam. Aenean vel vestibulum turpis. Vivamus posuere, ligula sed commodo semper, enim lectus lobortis ex, vulputate luctus arcu velit id urna.
                    </p>
                </div>
            </a>
        );
    }
}

export default Article;
