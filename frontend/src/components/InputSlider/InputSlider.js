import React, { Component } from 'react';
import './InputSlider.css';
import Slider from 'react-input-slider';


class InputSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, title: this.props.title, xmax: this.props.xmax }
    }

    render() {
        return (
            <div className="Slider">
                <h2>{this.state.title}</h2>
                <Slider
                    axis="x"
                    x={this.state.x}
                    xmax={this.state.xmax}
                    onChange={({ x }) => this.setState(state => ({ ...state, x }))} />
                <p>{this.state.x}</p>
            </div>
        );
    }
}

export default InputSlider;
