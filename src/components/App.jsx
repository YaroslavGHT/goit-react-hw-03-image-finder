import React, { Component } from 'react';
import { requesImageSearch } from '../services/api.js'
import { Searchbar } from './Searchbar/Searchbar.jsx'
import { Loader } from './Loader/Loader.jsx'
import {ImageGallery} from './ImageGallery/ImageGallery.jsx'
import { Button } from './Button/Button.jsx'
import {Modal} from './Modal/Modal.jsx'

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    search: '',
    total: 0,
    loading: false,
    loadingMore: false,
    isOpenModal: false,
    modalData: ''
  };

  fetchPostsByQuery = async (page, search) => {
    try {
      this.setState({ loading: true });
      const pic = await requesImageSearch(this.state.page, this.state.search);
      const { total, hits } = pic;
      // this.setState(prevState => {
      //   const uniqueHits = hits.filter(hit => !prevState.pictures.some(picture => picture.id === hit.id));
      //   return {
      //     pictures: [...prevState.pictures, ...uniqueHits],
      //     total: total,
      //     loading: false,
      //     loadingMore: false
      //   };
      // });
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits], 
        total: total,
        loading: false,
        loadingMore: false
      }));
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search || this.state.page !== prevState.page
    ) {
      this.fetchPostsByQuery(this.state.page, this.state.search);
    }
    if (this.state.isOpenModal === true) {
      window.addEventListener("keydown", this.handleKeyPress)
    }
  }

  componentWillUnmount() {
    if (this.state.isOpenModal === false) {
      window.removeEventListener("keydown", this.handleKeyPress)
    }
  }


  handleKeyPress = (event) => {
    if(event.code === "Escape") {
      this.handleCloseLargeImg();
    }
  }

  // componentDidUpdate () {
  //   if (this.state.isOpenModal === true) {
  //     window.addEventListener("keydown", this.handleKeyPress)
  //   }
  // }
  
  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    this.setState({ search: searchValue, pictures: [], page: 1 });
  };

  handleNextPage = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage })
  };

  handleShowLargeImg = pictureId => {
    const selectedProfile = this.state.pictures.find(
      picture => picture.id === pictureId
    );
    this.setState({
      isOpenModal: true,
      modalData: selectedProfile,
    });
  };

  handleCloseLargeImg = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    // console.log(this.handleShowLargeImg())
    // console.log(this.state.pictures)
    const morePictures = this.state.total >= this.state.page*12
    return (
      <div>
        <Searchbar
          handleSubmit={this.handleSubmit}
        />
        {this.state.loading === true && <Loader />}
        <ImageGallery
          handleShowLargeImg={this.handleShowLargeImg}
          pictures={this.state.pictures} />
        {morePictures === true && <Button
          handleNextPage={this.handleNextPage}
        />}       
        {this.state.isOpenModal === true && <Modal
          modalData={this.state.modalData}
          handleCloseLargeImg={this.handleCloseLargeImg}
        />} 
      </div>
    );
  }
}

