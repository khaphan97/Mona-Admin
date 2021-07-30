import React from "react";
import Logo from "assets/images/logo.png";
import "./styles/Header.scss";
import { Link } from "react-router-dom";

const Header = (props) => {
	return (
		<div className="logo">
			<Link to="/product">
				<img src={Logo} alt="" />
			</Link>
		</div>
	);
};

export default Header;
