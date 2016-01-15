/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';
import { browserHistory } from 'react-router';

/**
 * Import Internationalization.
 */
import {IntlProvider, addLocaleData} from 'react-intl';
import intlDE from 'react-intl/lib/locale-data/de';
import intlEN from 'react-intl/lib/locale-data/en';
import intlMessagesDE from '../public/assets/translations/de.json';
import intlMessagesEN from '../public/assets/translations/en.json';

/**
 * Import Routes.
 */
import routes from './routes';

/**
 * Import Styles. TODO: Add support for white-labels
 */
import styles from './index.less';

/**
 * Add internationalization for supported languages.
 */
addLocaleData(intlDE);
addLocaleData(intlEN);

/**
 * Setup the GraphQL Relay Network layer.
 */
// TODO: Inject the GraphQL endpoint by the build process.
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8088', {
    headers: {
      // TODO: Add your own authentication mechanism here.
      Authorization: '1234567890'
    }
  })
);

/**
 * The entry point of the application.
 */
class Index extends React.Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    this.state = {
      locale: 'en',
      messages: intlMessagesEN,
      windowWidth: window.innerWidth
    };
  }

  // Handle the window resize event.
  handleResize = (e) => {
    this.setState({windowWidth: window.innerWidth});
  };

  // Handle the application language change event.
  handleLanguageChange = (e) => {
    if (this.state.locale !== e.detail.language) {
      switch (e.detail.language) {
        case 'de':
          this.setState({locale: 'de', messages: intlMessagesDE});
          break;
        case 'en':
          this.setState({locale: 'en', messages: intlMessagesEN});
          break;
      }
    }
  };

  // Setup the component.
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('languageChangeEvent', this.handleLanguageChange);
  }

  // Cleanup the component.
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('languageChangeEvent', this.handleLanguageChange);
  }

  // Render the component.
  render() {
    // Return the component UI.
    return <IntlProvider locale={this.state.locale} messages={this.state.messages}>
      <RelayRouter
        history={browserHistory}
        routes={routes}
      />
    </IntlProvider>;
  }
}

/**
 * (Re-)Render the application.
 */
function render() {
  ReactDOM.render(
    <Index/>,
    document.getElementById('root')
  );
}

/**
 * Start the application.
 */
render();
