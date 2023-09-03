import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Container } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getGallery } from 'api.js';
import { GalleryModal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { GlobalStyle } from 'components/GlobalStyle';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    error: false,
    loading: false,
    srcImage: null,
    total: 0,
    showLoadMoreButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.query !== this.state.query &&
        this.state.query.split('/').pop() !== '') ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: false });
      getGallery(this.state.query.split('/').pop(), this.state.page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          this.setState(prevState => ({
            images: hits,
            total: totalHits,
          }));
        })
        .catch(error => this.setState({ error: true }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const search = e.currentTarget.elements.query.value.trim();
    if (!search) {
      toast.error('Please fill in the field!');
      return;
    }
    this.setState({
      query: `${Date.now()}/${search}`,
      images: [],
      page: 1,
    });
  };

  openModal = image => {
    this.setState({ showModal: true, srcImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, srcImage: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { showModal, images, loading, error, srcImage, total, page } =
      this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {error && !loading && toast.error('Oops! Something went wrong!')}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {images.length > 0 && page * 12 < total && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <GalleryModal
            isOpen={showModal}
            onRequestClose={this.closeModal}
            image={srcImage}
          />
        )}
        <GlobalStyle />
        <Toaster position="top-right" />
      </Container>
    );
  }
}
