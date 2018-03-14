import React from 'react';
import cheerio from 'cheerio';

import pageData from 'utils/api/home';
import ThreadList from 'shared/threadlist';
import Boards from './boards';

/*
pageData.featured ==> Array
ex. [ { title: 'Nnamdi Kanu does some biafra related thing again', url: 'http://nairaland.com/xyz' } ]

pageData.boards ==> Array
ex. [ {name: 'Nairaland/General', url: 'http://nairaland.com/xyz'} ]
*/

export default class Home extends React.Component {
  state = {
    document: this.props.document,
    boards: pageData.boards(this.props.document),
    threadList: pageData.currentFeaturedLinks(this.props.document),
    nextPage: 1,
    lastPage: 2646
  }

  fetchThreads = () => {
    fetch(`/links/${this.state.nextPage}`).then(res => {
      res.text().then(html => {
        const $ = cheerio.load(html),
              newThreads = pageData.oldFeaturedLinks($),
              updatedThreadList = this.state.threadList.concat(newThreads);

        this.setState({
          threadList: updatedThreadList,
          nextPage: this.state.nextPage + 1,
          lastPage: pageData.lastPage($)
        });
      });
    })
  }

  render() {
    // console.log(pageData.boards(this.props.document), pageData.featured(this.props.document));
    return (
      <section className="wrapper homepage">
        <aside className="boards">
          <Boards sections={this.state.boards} />
        </aside>

        <main className="featured-threads">
          <ThreadList threads={this.state.threadList} />

          { this.state.nextPage <= this.state.lastPage &&
            <button onClick={this.fetchThreads}>Load more</button>}
        </main>
      </section>
    );
  }
}