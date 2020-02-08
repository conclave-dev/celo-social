import React, { PureComponent } from 'react';
import Topbar from './presentational/layout/Topbar';
import Sidebar from './presentational/layout/Sidebar';
import Footer from './presentational/layout/Footer';
import Router from './Router';
import '../style/scss/App.scss';

class App extends PureComponent<{}> {
  render = () => (
    <div id="wrapper">
      <Topbar />
      <Sidebar />
      <div className="content-page">
        <Router />
        <Footer />
      </div>
    </div>
  );
}

export default App;
