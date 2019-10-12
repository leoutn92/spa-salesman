import React from 'react';

class Sale extends React.Component {
	render() {
		return (
			<tr>
			  <th>{this.props.sale.saleCode}</th>
	          <th>{this.props.sale.saleDate}</th>
	          <th>{this.props.sale.totalPriceSale}</th>
	        </tr>
	        )
	}
}

export default Sale;