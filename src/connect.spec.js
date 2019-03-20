const assert = require('power-assert');
import React from 'react';
import { RootContext } from './Context.js';
import { createStore, none } from '@ushiboy/cyclone';
import { mount } from 'enzyme';
import { connect } from './connect.js';

describe('connect', function() {
  const state = { count: 123 };
  const store = createStore(state, (s, a) => {
    return [s, none()];
  });

  context('default map state to props', () => {
    const View = props => {
      const { count } = props;
      return <div className="count">{count}</div>;
    };
    const ConnectedView = connect()(View);
    const wrapper = mount(
      <RootContext.Provider
        value={{
          storeState: store.getState(),
          store
        }}
      >
        <ConnectedView />
      </RootContext.Provider>
    );

    it('should pass all state', () => {
      assert(wrapper.find(View).prop('count') === state.count);
      assert(wrapper.find('.count').text() === `${state.count}`);
    });
    it('should pass dispatch method', () => {
      assert(wrapper.find(View).prop('dispatch') === store.dispatch);
    });
  });

  context('custom map state to props', () => {
    const View = props => {
      const { label } = props;
      return <div className="count">{label}</div>;
    };
    const ConnectedView = connect(state => {
      return { label: `count: ${state.count}` };
    })(View);
    const wrapper = mount(
      <RootContext.Provider
        value={{
          storeState: store.getState(),
          store
        }}
      >
        <ConnectedView />
      </RootContext.Provider>
    );

    it('should pass mapped state', () => {
      const label = `count: ${state.count}`;
      assert(wrapper.find(View).prop('label') === label);
      assert(wrapper.find('.count').text() === label);
    });
    it('should pass dispatch method', () => {
      assert(wrapper.find(View).prop('dispatch') === store.dispatch);
    });
  });
});
