import React from 'react';
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';

import Header from './components/shared/header';
import Footer from './components/shared/footer';
import Home from './components/home';
import CommentThread from './components/comment-thread';

import removeOldStyles from 'utils/remove-old-styles';
import generateNewApplicationContainer from 'utils/generate-app-container';

const $ = cheerio.load(document.body.innerHTML);
const userName = $('#up .user').text();

removeOldStyles();
generateNewApplicationContainer();

import './styles/default/overhaul.scss';

class App extends React.Component {
  renderRequiredComponent() {
    // console.log($('table[summary=posts]').length)
    if (location.pathname === '/' || location.pathname === '/home') { // Homepage
      return <Home document={$} />
    } else if ( location.pathname.match(/^\/\d+\/[\w]+(-[\w]+)*(\/\d+)?$/) ) { // Comments thread
      return <CommentThread document={$}/>
    }

  }

  render() {
    return (
      <div>
        <Header user={userName} />
        { this.renderRequiredComponent() }
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
