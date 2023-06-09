import React from 'react';
/* import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom'; */
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history'

import App from './App'

// let root = null;

const mount = (el, { location, onNavigate, defaultHistory }) => {
  console.log('12 -- marketing bootstrap location', location)
  console.log('13 -- marketing bootstrap onNavigate', onNavigate)
  console.log('14 -- marketing bootstrap defaultHistory', defaultHistory)

  /* if (!el) {
    root = null;
    return;
  } */

  const history = location
    ? createMemoryHistory({
        initialEntries: [location.pathname],
      })
    : defaultHistory

  if (onNavigate) {
    history.listen(({ location }) => onNavigate(location));
  }

  // use this to avoid root already defined in container app warning:
  /* Warning is: rning: You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it. */
  // Although it fixes the warning, but cause page no change back to home error, no fully successful.
  /* root = root ? root : ReactDOMClient.createRoot(el);
  root.render(<App history={history} />); */
  // ReactDOMClient.createRoot(el).render(<App history={history} />)
  /* ReactDOM.hydrate(
    <App history={history} />,
    el
  ); */
  const root = createRoot(el);
  root.render(<App history={history} />);
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_marketing-dev-root')
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }
