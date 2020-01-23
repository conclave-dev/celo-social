import React, { memo } from 'react';
import Topbar from './presentational/Layout/Topbar';
import Sidebar from './presentational/Layout/Sidebar';
import Footer from './presentational/Layout/Footer';
import Elections from './container/Elections';
import './style/scss/App.scss';

const App = memo(() => (
  <div id="wrapper">
    <Topbar />
    <Sidebar />
    <div className="content-page">
      <Elections />
      <Footer />
    </div>
  </div>
));

export default App;
