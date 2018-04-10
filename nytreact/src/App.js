import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Results from './results/Results';

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      search: "",
      startDate: "",
      endDate: ""
    }
  }

  getArticles = (event) => {
    event.preventDefault();
    let end = (this.state.endDate == undefined) ? 0 : this.state.endDate;
    return fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.search}&begin_date=${this.state.startDate}0101&endDate=${this.state.endDate}1231&api-key=0eafe269423a4ff88b474ef6d3ceea7e`)
      .then(res => res.json())
      .then(res => this.setState({ articles: res.response.docs }))
  }

  componentDidMount() {
    // this.getArticles('jazz', '20180101')
    this.showSavedArticles();
    // .then(articles => this.setState({ articles }));


  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name
    this.setState({ [name]: value });
  };

  saveArticle = (event) => {
    debugger;
    const title = event.target.parentElement.children[0].textContent;
    const snippet = event.target.parentElement.children[1].textContent;
    const publicationDate = event.target.parentElement.children[2].textContent;
    const url = event.target.parentElement.children[3].textContent;

    fetch("/api/articles", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, snippet: snippet, publicationDate: publicationDate, url: url })
    })
      .then(res => res.json())
  }

  showSavedArticles = () => {
    debugger;
    return fetch("/api/savedarticles", {
      method: 'GET'
      // }).then(res => console.log(res));
      // ())
    }).then(res => res.json())
      .then(res => console.log(res));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://www.ispu.org/wp-content/uploads/2016/08/nyt-circle.png" className="App-logo" alt="logo" />
          <h1 className="App-title">New York Times Article Scraper</h1>
          <h3 className="App-subtitle">Search for and annotate articles of interest!</h3>
        </header>

        <h1>Search</h1>
        <form>
          <label>Topic</label>
          <input type="text" name="search" onChange={this.handleInputChange}></input>
          <label>Start Year</label>
          <input type="text" name="startDate" onChange={this.handleInputChange}></input>
          <label>End Year</label>
          <input type="text" name="endDate" onChange={this.handleInputChange}></input>
          <input type="submit" onClick={this.getArticles}></input>
        </form>


        <h1>Results</h1>
        {this.state.articles.map((art, ind) => <ul key={ind}>
          <li> {art.headline.main}</li>
          <li> {art.snippet}</li>
          <li> {art.pub_date}</li>
          <li> {art.web_url}</li>

          <button onClick={this.saveArticle}>Save</button>

        </ul>
        )}
        <h1>Saved Articles</h1>

        <ul>
   

        </ul>
      </div>
      );
    }
  }

export default App;
