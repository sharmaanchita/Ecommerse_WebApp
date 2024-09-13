import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../Images/logo.png";
import { MdAccountCircle } from 'react-icons/md';
import { MdSearch } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';

const options = {
  burgerColor: "#ff1a66",
  burgerColorHover: '#ffb3d9',
  logo,
  logoWidth: '20vmax',
  navColor1: '#ffe6f2',
  logoHoverSize: '10px',
  logoHoverColor: '#ffb3d9',
  link1Text: 'Home',
  link2Text: 'Products',
  link3Text: 'Contact Us',
  link4Text: 'About Us',
  link1Url: '/',
  link2Url: '/products',
  link3Url: '/contact',
  link4Url: '/about',
  link1Size: '1.3vmax',
  link1Color: '#ff1a66',
  nav1justifyContent: 'flex-end',
  nav2justifyContent: 'flex-end',
  nav3justifyContent: 'flex-start',
  nav4justifyContent: 'flex-start',
  link1ColorHover: '#ffb3d9',
  link1Margin: '1vmax',
  profileIcon: true,
  profileIconColor: '#ff1a66',
  profileIconUrl: '/login',
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: '#ff1a66',
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: '#ff1a66',
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: '#ffb3d9',
  searchIconColorHover: '#ffb3d9',
  cartIconColorHover: '#ffb3d9',
  cartIconMargin: '1vmax',
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;