const assert = require('power-assert');
import React from 'react';
import { RootContext } from './Context.js';
import { createStore, none } from '@ushiboy/cyclone';
import { mount } from 'enzyme';
import { Provider } from './Provider.js';

describe('<Provider />', function() {
  let View, state, store, wrapper;

  beforeEach(() => {
    View = props => {
      const { count } = props.storeState;
      return <div className="count">{count}</div>;
    };
    state = { count: 123 };
    store = createStore(state, (s, a) => {
      switch (a.type) {
        case 'increment': {
          return [{ count: s.count + 1 }, none()];
        }
        default: {
          return [s, none()];
        }
      }
    });

    wrapper = mount(
      <Provider store={store}>
        <RootContext.Consumer>
          {({ storeState, store }) => {
            return <View storeState={storeState} store={store} />;
          }}
        </RootContext.Consumer>
      </Provider>
    );
  });
  it('should pass the state that store has', async () => {
    assert(wrapper.find('.count').text() === `${state.count}`);
    assert(wrapper.find(View).prop('storeState') === store.getState());
  });
  it('should pass the store', async () => {
    assert(wrapper.find(View).prop('store') === store);
  });
  it('should redraw the child once the state is updated', async () => {
    await store.dispatch({ type: 'increment' });
    assert(wrapper.find('.count').text() === `${state.count + 1}`);
  });
  context('when unmount', () => {
    it('should unsubscribe from the store', async () => {
      // check safe unmount(
      wrapper.unmount();
      await store.dispatch({ type: 'increment' });
    });
  });
});
