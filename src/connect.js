import React from 'react';
import { RootContext } from './Context.js';

function defaultMapStateToProps(state) {
  return state;
}

export function connect(mapStateToProps = defaultMapStateToProps) {
  return View => props => {
    return (
      <RootContext.Consumer>
        {({ storeState, store }) => {
          const mapProps = mapStateToProps(storeState);
          return <View {...props} {...mapProps} dispatch={store.dispatch} />;
        }}
      </RootContext.Consumer>
    );
  };
}
