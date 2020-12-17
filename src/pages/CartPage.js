import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
	checkoutAction,
} from "../redux/actions";
import Swal from "sweetalert2";
import Fade from "react-reveal/Fade";

class CartPage extends Component {
	state = {};
	componentDidMount() {
		const { userID, fetchCartAction } = this.props;
		fetchCartAction(userID);
	}
	deleteBtn = (id, userID) => {
		const { deleteCartAction } = this.props;
		deleteCartAction(id, userID);
	};
	addBtn = (name, qty, id) => {
		const { addQtyAction, userID } = this.props;
		addQtyAction(name, qty, id, userID);
	};
	subBtn = (name, qty, id) => {
		const { subQtyAction, userID } = this.props;
		subQtyAction(name, qty, id, userID);
	};
	renderCart = () => {
		const { cart } = this.props;
		return cart.map((val, i) => {
			return (
				<Fade bottom>
					<div
						className="d-flex align-items-center"
						style={{ borderBottom: "1px solid grey" }}
					>
						<div style={{ width: "30%" }}>
							<img src={val.image} alt="img not found" height="250px" />
						</div>
						<div
							className="d-flex justify-content-between"
							style={{ width: "20%" }}
						>
							<h3>{val.name}</h3>
						</div>
						<div
							className="d-flex justify-content-between"
							style={{ width: "50%" }}
						>
							<div className="d-flex">
								<Button
									className="btn btn-light"
									onClick={() => this.subBtn(val.name, val.qty, val.id)}
								>
									-
								</Button>
								<h3 className="mx-2">{val.qty} </h3>
								<Button
									className="btn btn-light"
									onClick={() => this.addBtn(val.name, val.qty, val.id)}
								>
									+
								</Button>
							</div>

							<h3>Rp. {val.qty * val.price}</h3>
							<Button
								className="btn btn-light"
								style={{ backgroundColor: "transparent" }}
								onClick={() => this.deleteBtn(val.id, val.userID)}
							>
								<img
									src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png"
									alt=""
									height="40px"
								/>
							</Button>
						</div>
					</div>
				</Fade>
			);
		});
	};
	grandTotal = () => {
		const { cart } = this.props;
		let total = 0;
		cart.forEach((val) => {
			total += val.qty * val.price;
		});
		return total;
	};
	checkOut = () => {
		const { cart, userID, checkoutAction } = this.props;
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		const data = {
			date: `${day}-${month}-${year}`,
			total: this.grandTotal(),
			items: cart,
			userID: userID,
		};

		checkoutAction(data);
	};
	checkOutAlert = () => {
		Swal.fire({
			title: "Are you sure want to checkout?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, check my cart out",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Your file has been deleted.", "success");
				this.checkOut();
			}
		});
	};
	render() {
		const { cart } = this.props;
		if (cart.length === 0) {
			return (
				<div>
					<h1>Your cart is empty</h1>
				</div>
			);
		}
		return (
			<div className="container">
				<div>
					<h1 style={{ fontWeight: "600", marginBottom: "15px" }}>
						Review your cart.
					</h1>
				</div>

				<div className="border-top border-dark">{this.renderCart()}</div>
				<div className="d-flex flex-column justify-content-center align-items-end">
					<h1 style={{ fontWeight: "600" }}>
						Your cart total is Rp. {this.grandTotal().toLocaleString()}
					</h1>
					<Button
						color="primary"
						style={{ width: "200px" }}
						onClick={this.checkOutAlert}
					>
						Check Out
					</Button>
				</div>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		cart: state.cart.cart,
		userID: state.user.id,
	};
};
export default connect(mapStatetoProps, {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
	checkoutAction,
})(CartPage);
