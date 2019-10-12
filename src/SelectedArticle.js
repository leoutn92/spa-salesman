import React from 'react';

class Article extends React.Component {
	render= function() {
		return (
			<tr>
        <th>{this.props.article.articleCode}</th>
        <th>{this.props.article.hero}</th>
        <th>{this.props.article.articleType}</th>
        <th>{this.props.article.size}</th>
        <th>{this.props.article.stock}</th>
        <th>{this.props.article.unitPrice}</th>
        <th>{this.props.article.description}</th>
        <th>{this.props.article.amountSold}</th>
        <th>{this.props.article.totalPrice}</th>
      </tr>)
	}
}

export default Article;