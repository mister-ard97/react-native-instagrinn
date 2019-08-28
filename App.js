import React, { Component } from 'react';
import AppInit from './src/components/AppInit';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';

const store = createStore(reducers, {}, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
       <Provider store={store}>
         <AppInit />
       </Provider>
    );
  }
}


export default App;