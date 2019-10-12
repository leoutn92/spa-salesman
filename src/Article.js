import React from 'react';

class Article extends React.Component {
	handleAmountOfArticleBeingSold(e) {
		this.setState({amount: e.target.value});
	}

	handleSelectArticle() {
		var selectedArticle = {
			articleCode: this.props.article.articleCode,
			hero: this.props.article.hero,
			articleType: this.props.article.articleType,
			size: this.props.article.size,
            stock: this.props.article.stock - this.state.amount,
            unitPrice: this.props.article.price,
            description: this.props.article.description,
            amountSold: this.state.amount,
            totalPrice: this.state.amount * this.props.article.price
		};
		this.props.handleAddArticle(selectedArticle);
	}

	render= function() {
		return (
			<tr>
              <th>{this.props.article.articleCode}</th>
              <th>{this.props.article.hero}</th>
              <th>{this.props.article.articleType}</th>
              <th>{this.props.article.size}</th>
              <th>{this.props.article.stock}</th>
              <th>{this.props.article.price}</th>
              <th>{this.props.article.description}</th>
              <th>
              	<input onChange={this.handleAmountOfArticleBeingSold.bind(this)}></input>
              </th>
              <th><button onClick={this.handleSelectArticle.bind(this)}>add</button></th>
            </tr>)
	}
}

export default Article;