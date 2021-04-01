import React, { Component } from 'react'
import { createAppContainer, NavigationActions } from 'react-navigation';
import { AppNavigator } from './component/Navigation'
import { store } from './storage/store'
import { Provider } from 'react-redux'

export default class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <AppContainer 
            ref={nav => { this.navigator = nav; }}
          />
        </Provider>

    )
  }
}

const AppContainer = createAppContainer(AppNavigator)