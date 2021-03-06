import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, none } from '@ushiboy/cyclone';
import { Provider, connect } from '@ushiboy/react-cyclone';

const increment = () => ({ type: 'increment' });
const decrement = () => ({ type: 'decrement' });

const store = createStore({ count: 0 }, (state, action) => {
  switch (action.type) {
    case 'increment': {
      return [{ count: state.count + 1 }, none()];
    }
    case 'decrement': {
      return [{ count: state.count - 1 }, none()];
    }
    default: {
      return [state, none()];
    }
  }
});

const App = props => {
  const { count, dispatch } = props;
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
    </div>
  );
};
const ConnectedApp = connect()(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#app')
);
