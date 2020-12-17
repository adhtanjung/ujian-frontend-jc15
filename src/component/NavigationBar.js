import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { logoutAction } from "../redux/actions";
import "./navbar.css";

class NavigationBar extends Component {
	state = { isOpen: false };

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	logout = () => {
		const { logoutAction } = this.props;
		logoutAction();
		localStorage.removeItem("id");
	};
	renderNavBarLoggedIn = () => {
		const { userEmail } = this.props;
		const { userID } = this.props;
		if (userID !== 0) {
			return (
				<Nav className="d-flex align-items-center">
					<Link to="/cart" className="notification">
						Cart
						<span className="badge">{this.props.cart.length}</span>
					</Link>
					<NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret style={{ color: "black" }}>
								{userEmail.split("@")[0]}
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem />
								<Link to="/history">
									<DropdownItem>History</DropdownItem>
								</Link>
							</DropdownMenu>
						</UncontrolledDropdown>
					</NavItem>
					<NavItem>
						<Link to="/" onClick={this.logout} className="notification">
							Logout
						</Link>
					</NavItem>
				</Nav>
			);
			// }
		} else {
			return (
				<Nav>
					<Link to="/login" className="notification">
						Login
					</Link>
				</Nav>
			);
			// <DropdownMenu right>

			// 		<DropdownItem></DropdownItem>

			// 	<DropdownItem>Option 2</DropdownItem>
			// 	<DropdownItem divider />
			// 	<DropdownItem>Reset</DropdownItem>
			// </DropdownMenu>
		}
	};

	render() {
		return (
			<Navbar
				color="light"
				light
				expand="md"
				style={{ boxShadow: "1px 1px 10px 1px #bcbcbc" }}
				className="mb-1"
			>
				<NavbarBrand
					href="/"
					style={{
						fontFamily: "Playfair Display",
						fontWeight: "bolder",
						fontSize: "28px",
					}}
					className="d-flex justify-content-center "
				>
					Live Well
				</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="mr-auto" navbar></Nav>
					{this.renderNavBarLoggedIn()}
				</Collapse>
			</Navbar>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
		userRole: state.user.role,
		userEmail: state.user.email,
		cart: state.cart.cart,
	};
};

export default connect(mapStatetoProps, { logoutAction })(NavigationBar);
