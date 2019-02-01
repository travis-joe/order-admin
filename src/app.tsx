import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import store from './models/store';

export function rootContainer(container: Component) {
  return React.createElement(Provider, store, container)
}
