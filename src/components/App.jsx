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
    key: '40634472-56a7999d13afd9c7f5d079b0e',
    search: '',
    total: 0,
    loading: false,
    loadingMore: false
  };

  fetchPostsByQuery = async (page, key, search) => {
    try {
      this.setState({ loading: true });
      const pic = await requesImageSearch(this.state.page, this.state.key, this.state.search);
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
      this.fetchPostsByQuery(this.state.page, this.state.key, this.state.search);
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    this.setState({ search: searchValue });
    this.setState({ pictures: [], page: 1})
  };

  handleNextPage = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage })
      // , () => {
      // this.fetchPostsByQuery(nextPage, this.state.key, this.state.search);
    // });
  };

  render() {
    console.log(this.state.pictures)
    const morePictures = this.state.total >= this.state.page*12
    return (
      <div>
        <Searchbar
          handleSubmit={this.handleSubmit}
        />
        {this.state.loading === true && <Loader />}
        <ImageGallery pictures={this.state.pictures}/>
        {morePictures === true && <Button
          handleNextPage={this.handleNextPage}
        />}       
        {/* <Modal/> */}
      </div>
    );
  }
}

