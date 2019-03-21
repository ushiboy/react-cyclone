import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RootContext } from './Context.js';

export class Provider extends Component {
  constructor(props) {
    super(props);

    const { store } = props;
    this.state = {
      storeState: store.getState(),
      store
    };
  }

  componentDidMount() {
    this._subscribeStore();
  }

  componentWillUnmount() {
    if (this._unsubscriber) {
      this._unsubscriber();
    }
  }

  render() {
    const Context = this.props.context || RootContext;
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

  _subscribeStore() {
    const { store } = this.props;
    this._unsubscriber = store.subscribe(() => {
      const newState = store.getState();

      this.setState(providerState => {
        if (providerState.storeState === newState) {
          return null;
        }
        return { storeState: newState };
      });
    });
  }
}

Provider.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired
  }),
  context: PropTypes.object,
  children: PropTypes.any
};
