import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topbar from './presentational/layout/Topbar';
import Sidebar from './presentational/layout/Sidebar';
import Footer from './presentational/layout/Footer';
import Router from './Router';
import { getElectionsCache, setElectionsCache } from '../data/state/actions/elections';
import '../style/scss/App.scss';

class App extends PureComponent<{setElectionsCache}> {
  constructor(props) {
    super(props);

    props.getElectionsCache();
  }

  cacheStore = () => {
    this.props.setElectionsCache();
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.cacheStore);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.cacheStore);
  }

  render = () => (
    <div id="wrapper">
      <Topbar />
      <Sidebar />
      <div className="content-page">
        <Router />
        <Footer />
      </div>
    </div>
  )
}

export default connect(null, {
  getElectionsCache,
  setElectionsCache,
})(App);
