# React-Cyclone

React-Cyclone is a React bindings for Cyclone.

## Quick Sample

Here is a simple counter.

```javascript
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
```

## API

### `<Provider />`

It passes the state mapped to properties to the React component that applied `connect`.

#### Props

| Name | Type | Description |
| ---- | ---- | ----------- |
| store | Store<S, A> | The Store of Cyclone. |

### connect

It makes it possible to receive the state mapped to properties from `Provider`.

If you set the `mapStateToProps` function to its argument, you can customize the state to the properties and pass it.

```javascript
connect(): (view: React$Component) => React$Component;
connect<S, P>(mapStateToProps: (state: S) => P): (view: React$Component) => React$Component;
```

Example of passing mapStateToProps as an argument.

```javascript
// state: { a: any, b: any, c: any }
const Connected = connect(state => {
  const { a, b } = state;
  return {
    a,
    b
  };
})(View);
```

## Change Log

### 0.1.0

Initial React-Cyclone release.

## License

MIT
