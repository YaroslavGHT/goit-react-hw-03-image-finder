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
    modalImg: ''
  };

  fetchPostsByQuery = async (page, search) => {
    try {
      this.setState({ loading: true });
      const pic = await requesImageSearch(this.state.page, this.state.search);
      const { total, hits } = pic;
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
    if (this.state.search !== prevState.search || this.state.page !== prevState.page) {
      if (this.state.search.match(/[a-zA-Zа-яА-Я0-9]/)) {
        this.fetchPostsByQuery(this.state.page, this.state.search);
    }}
  };
  
  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    this.setState({ search: searchValue, pictures: [], page: 1 });
  };

  handleNextPage  = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleShowLargeImg = (largeImg) => {
    this.setState({
      isOpenModal: true,
      modalImg: largeImg
    });
  };

  handleCloseLargeImg = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
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
          modalImg={this.state.modalImg}
          handleCloseLargeImg={this.handleCloseLargeImg}
          isOpenModal={this.state.isOpenModal}
        />} 
      </div>
    );
  }
}

