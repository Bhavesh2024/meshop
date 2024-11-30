import React from "react";
import { Link } from "react-router-dom";

const Footer = ({style}) => {
	const currentYear = new Date().getFullYear();
	const contacts = [
		{
			brand: "Phone",
			icon: <i className="fa-solid fa-phone"></i>,
			value: "+91 9723884857",
			link: "tel:+91 9723884857",
		},
		{
			brand: "Gmail",
			icon: <i className="fa-solid fa-envelope"></i>,
			value: "contact@meshop.com",
			link: "mailto:contact@meshop.com",
		},
		{
			brand: "What's App",
			icon: <i className="fa-brands fa-whatsapp"></i>,
			value: "+91 9033835047",
			link: "https://wa.me/9033835047",
		},
	];
	const socialLinks = [
		{
			brand: "Instagram",
			icon: <i className="fa-brands fa-instagram"></i>,
			link: "https://www.instagram.com",
		},
		{
			brand: "Facebook",
			icon: <i className="fa-brands fa-facebook"></i>,
			link: "https://www.facebook.com",
		},
		{
			brand: "Youtube",
			icon: <i className="fa-brands fa-youtube"></i>,
			link: "https://www.youtube.com",
		},
	];

	const products = ["SmartPhone", "T.V.", "Headphones"];
	return (
		<footer className="bg-slate-800 text-gray-200 font-light w-full" style={style}>
			<div className="flex justify-around items-center flex-col md:flex-row gap-4">
				<div className="logo w-full md:w-1/3 flex flex-col gap-2 p-5">
					<h1 className="text-6xl font-mono font-bold text-center md:text-start">
						MeShop
					</h1>
					<p className="text-justify">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Qui consectetur eligendi ex nostrum hic amet repellat,
						illum maxime.
					</p>
				</div>
				<div className="flex w-11/12 justify-around my-4 flex-wrap flex-col xs:flex-row gap-5 items-center">
					<ul>
						<li className="text-xl font-semibold">Products</li>
						{products.map((value) => (
							<>
								<li className="text-sm md:text-lg">{value}</li>
							</>
						))}
					</ul>
					<ul>
						<li className="text-xl font-semibold">Follow Us</li>
						{socialLinks.map((value) => (
							<>
								<li className="text-sm md:text-lg">
									{value.icon}&nbsp;
									<a href={`${value.link}`} target="blank">
										{value.brand}
									</a>
								</li>
							</>
						))}
					</ul>
					<ul>
						<li className="text-xl font-semibold">Contact Us</li>
						{contacts.map((value) => (
							<>
								<li className="text-sm md:text-lg">
									{value.icon}&nbsp;
									<a href={`${value.link}`}>{value.brand}</a>
								</li>
							</>
						))}
					</ul>
				</div>
			</div>
			<div className="h-16 justify-center flex items-center border-t w-full">
				<p>&copy; {currentYear} meshop. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
