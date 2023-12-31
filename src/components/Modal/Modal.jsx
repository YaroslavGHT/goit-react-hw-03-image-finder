import React, { Component } from 'react';
import css from './Modal.module.css'

export class Modal extends Component{
  handleOverlayClick = (event) => {
    if(event.target === event.currentTarget) {
      this.props.handleCloseLargeImg();
    }
  }

  render() {
    return (
        <div className={css.overlay} onClick={this.handleOverlayClick}>
            <div className={css.modal}>
              <img src={this.props.modalData.largeImageURL} alt={this.props.modalData.tags} />
            </div>
        </div>
    );
  }
};


