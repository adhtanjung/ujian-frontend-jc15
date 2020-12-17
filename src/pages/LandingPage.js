import React, { Component } from "react";
import { connect } from "react-redux";
import { ProductCard } from "../component";
import { Carousel } from "../component";
import { fetchProducts } from "../redux/actions";
// import { ProductModal } from "../component";
import { ToastContainer, toast } from "react-toastify";
import Slide from "react-reveal/Slide";

import "react-toastify/dist/ReactToastify.css";

class LandingPage extends Component {
	state = {};

	componentDidMount() {
		const { fetchProducts } = this.props;
		fetchProducts();
	}
	toast = () => {
		toast("wow ");
	};
	renderCard = () => {
		const { product } = this.props;
		return product.map((val, i) => {
			return (
				<Slide bottom>
					<div className="m-5">
						<ProductCard
							image={val.image}
							name={val.name}
							price={val.price}
							id={val.id}
						/>
					</div>
				</Slide>
			);
		});
	};
	render() {
		return (
			<div className=" d-flex flex-column ">
				<div>
					<Carousel />
				</div>
				<div></div>

				<div className="d-flex flex-wrap">
					{this.renderCard()}

					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
			</div>
		);
	}
}
const mapStatetoProps = ({ product }) => {
	return {
		product: product.productList,
	};
};

export default connect(mapStatetoProps, { fetchProducts })(LandingPage);
