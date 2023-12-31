import React, { Component } from 'react';
import css from './Modal.module.css'

export class Modal extends Component{

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.handleCloseLargeImg();
    }
  };

  componentDidMount() {
    if (this.props.isOpenModal) {
      window.addEventListener("keydown", this.handleKeyPress)
    }
  };
  
  componentWillUnmount() {
      window.removeEventListener("keydown", this.handleKeyPress)
  };

  handleKeyPress = (event) => {
    if (event.code === 'Escape') {
      this.props.handleCloseLargeImg();
    }
  };

  render() {
    return (
        <div className={css.overlay} onClick={this.handleOverlayClick}>
            <div className={css.modal}>
              <img src={this.props.modalImg} alt='modal' />
            </div>
        </div>
    );
  }
};


