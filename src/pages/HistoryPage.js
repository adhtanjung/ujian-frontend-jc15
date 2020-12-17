import Axios from "axios";
import { Button } from "reactstrap";
import React, { Component } from "react";
import { Table } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { connect } from "react-redux";

class HistoryPage extends Component {
	state = { history: [] };
	componentDidMount() {
		this.fetchHistory();
	}
	componentDidUpdate(prevProps, prevState) {
		const { userID } = this.props;
		if (prevProps.userID !== userID) {
			this.fetchHistory();
		}
	}
	fetchHistory = () => {
		const { userID } = this.props;
		Axios.get(`${api_url}/transaction?userID=${userID}`)
			.then((res) => {
				this.setState({
					history: res.data,
				});
			})
			.catch((err) => {});
	};
	cancelOrder = (id, items) => {
		items.forEach((val) => {
			Axios.get(`${api_url}/products?name=${val.name}`)
				.then((res) => {
					Axios.patch(`${api_url}/products/${res.data[0].id}`, {
						stock: res.data[0].stock + val.qty,
					})
						.then((res) => {})
						.catch((err) => {});
				})
				.catch((err) => {});
			// let name = val.find((val)=>{
			//     return val.name ===
			// })
		});
		Axios.delete(`${api_url}/transaction/${id}`)
			.then((result) => {
				this.fetchHistory();
			})
			.catch((err) => {});
	};
	renderHistory = () => {
		const { history } = this.state;

		return history.map((val, index) => {
			let res = val.items.map((val) => {
				return (
					<tr className="d-flex justify-content-between">
						<td>{val.name}</td>
						<td>price: {val.price}</td>
						<div>qty: {val.qty}</div>
					</tr>
				);
			});
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{val.date}</td>
					<td>{res}</td>
					<td>{val.total}</td>
					<td>Belum Bayar</td>
					<td>
						<Button onClick={() => this.cancelOrder(val.id, val.items)}>
							Cancel
						</Button>
					</td>
					<td></td>
				</tr>
			);
		});
	};
	render() {
		console.log(this.state.history);
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Items</th>
							<th>Total</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderHistory()}</tbody>
				</Table>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
	};
};

export default connect(mapStatetoProps)(HistoryPage);
