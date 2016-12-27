import React, { Component } from 'react';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleSquare(this.props.coords);
  }

  getSquareClasses() {
    const { isActive, isSelected } = this.props;
    return `square${isActive ? ' active' : ''}${isSelected ? ' selected' : ''}`;
  }

  render() {
    return <div onClick={this.handleClick} className={this.getSquareClasses()} />;
  }
}

Square.propTypes = {
  isActive: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  coords: React.PropTypes.array,
  toggleSquare: React.PropTypes.func
};
