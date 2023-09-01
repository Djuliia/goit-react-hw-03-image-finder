import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Container } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getGallery } from 'api.js';
import { GalleryModal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { GlobalStyle } from 'components/GlobalStyle';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    error: false,
    loading: false,
  };

  // async componentDidUpdate(prevProps, prevState) {
  // if (
  //   this.state.page !== prevState.page ||
  //   this.state.query !== prevState.query
  // )
  // {
  // try {
  //   this.setState({loading : true, error: false});
  //   console.log('query:', this.state.query);
  //   console.log('page:', this.state.page);
  //     const images = await getGallery(this.state.query, this.state.page);
  //     this.setState({images: images.hits});
  // }

  //     catch (error) {
  //       this.setState({error: true});
  //     } finally {
  //           this.setState({loading: false});
  //          }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ loading: true, error: false });
      console.log('query:', this.state.query);
      console.log('page:', this.state.page);
      getGallery(this.state.query, this.state.page)
        .then(({ hits }) => {
          console.log('API Response:', hits);
          if (!hits.length) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          this.setState(
            prevState => ({
              images: [...prevState.images, ...hits],
            }),
            () => {
              console.log('Updated State:', this.state.images);
            }
          );
        })
        .catch(error => this.setState({ error: true }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      query: e.target.elements.query.value.trim(),
      images: [],
      page: 1,
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { showModal, images, loading, error } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {error && !loading && toast.error('Oops! Something went wrong!')}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {!images.length && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <GalleryModal
            isOpen={showModal}
            onRequestClose={this.closeModal}
            images={images}
          />
        )}
        <GlobalStyle />
        <Toaster position="top-right" />
      </Container>
    );
  }
}
