import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';
import Loader from './Loader';
import ErrorNotification from './ErrorNotification';

const mapper = items => {
  return items.map(({ avatar_url: avatar, html_url: link, ...props }) => ({
    avatar,
    link,
    ...props,
  }));
};

export default class App extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(
        'https://api.github.com/search/users?q=location:kyiv&sort=followers&order=desc&per_page=10',
      )
      .then(data => {
        const userPromises = data.data.items.map(item => {
          return axios.get(item.url);
        });

        Promise.all(userPromises)
          .then(items =>
            this.setState({ items: mapper(items.map(item => item.data)) }),
          )
          .catch(error => this.setState({ error }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { items, isLoading, error } = this.state;
    return (
      <Fragment>
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Loader />}
        {items.length > 0 && <ItemsList items={items} />}
      </Fragment>
    );
  }
}
