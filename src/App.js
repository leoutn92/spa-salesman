import React from 'react';
import Article from './Article';
import Sale from './Sale';
import SelectedArticle from './SelectedArticle'
import './App.css';
import remove from 'lodash/remove';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles : [], selectedArticles : [], sales: []};
  }
  
  handleAddArticle(articleSelected) {
    this.state.selectedArticles.push(articleSelected);
    remove(this.state.articles, function(article) {
      return article.articleCode ==articleSelected.articleCode;
    });
    this.setState({
      articles: this.state.articles,
      selectedArticles: this.state.selectedArticles})
  }

  handleBuyButton() {   
    fetch("http://localhost:8090/salesman/sales", 
    {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({articlesToBeSold: this.state.selectedArticles})
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      window.location.reload();
    });
  }

  render() {

    return (
      <div className="App">
        {this.renderArticles()}
        {this.renderSelectedArticles()}
        {this.renderSales()}
      </div>
    )};

  renderArticles() {
    return (
      <div>
        <h1>Articles Table</h1>
        <table>
          {(this.state.articles.length > 0) ? (
            <tr>
              {Object.keys(this.state.articles[0]).map(function(key) {
                return (<th>{key}</th>) 
              })}
            </tr>) : this.state.articles[0]}
          {this.state.articles ? this.state.articles.map((article) => this.renderArticle(article)) : this.state.articles}
        </table>
      </div>
    ) 
  }

  renderArticle(article) {
    return (<Article article={article} handleAddArticle={this.handleAddArticle.bind(this)}/>)
  }

  renderSales() {
    return (
      <div>
        <h1>Sales Table</h1>
        <table>
          <tbody>
          {(this.state.sales.length > 0) ? (
            <tr>
              {Object.keys(this.state.sales[0]).map(function(key) {
                return (<th>{key}</th>) 
              })}
            </tr>) : this.state.sales[0]}
          {(this.state.sales.length > 0) ? 
            this.state.sales.map((sale) => this.renderSale(sale)) : 
            this.state.sales}
          </tbody>
        </table>
      </div>
    ) 
  }

  renderSale(sale) {
    return (<Sale sale={sale}/>) 
  }

  renderSelectedArticles() {
    return (
      <div>
        <h1>Sale in progress</h1>
        <table>
          <tbody>
          {(this.state.selectedArticles.length > 0) ? (
            <tr>
              {Object.keys(this.state.selectedArticles[0]).map(function(key) {
                return (<th>{key}</th>) 
              })}
            </tr>) : this.state.selectedArticles[0]}
          {this.state.selectedArticles ? 
            this.state.selectedArticles.map((article) => this.renderSelectedArticle(article)) : 
            this.state.selectedArticles}
          </tbody>
        </table>
        {this.renderTotalPrice()}
        <button onClick={this.handleBuyButton.bind(this)}>Buy</button>
      </div>
    ) 
  }

  renderSelectedArticle(article) {
    return (<SelectedArticle article={article}/>);
  }

  renderTotalPrice() {
    var totalPrice = 0; 
    this.state.selectedArticles.map((selectedArticle) => totalPrice += selectedArticle.totalPrice);
    return (<label>Total Price: {totalPrice}</label>)
  }

  componentDidMount= function() {
    this.updateSales();
    this.updateArticles();
  }

  updateSales() {
    fetch('http://localhost:8090/salesman/sales')
      .then(response => response.json())
      .then(data => this.setState({ sales : data }));
  }

  updateArticles() {
    fetch('http://localhost:8090/salesman/articles')
      .then(response => response.json())
      .then(data => this.setState({ articles : data }));
  }
}

export default App;
