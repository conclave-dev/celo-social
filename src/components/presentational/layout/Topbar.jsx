import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import LanguageMenu from './menus/Language';
import NotificationsMenu from './menus/Notifications';
import ProfileMenu from './menus/Profile';
import celoLogo from '../../../static-assets/svg/celo-logo.svg';
import celoGlyph from '../../../static-assets/svg/celo-glyph.svg';

const Topbar = () => {
  const sidebarToggle = () => {
    document.body.classList.toggle('enlarged');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <Link to="/" className="logo">
          <span className="logo-light">
            <img src={celoLogo} alt="" height="64" />
          </span>
          <span className="logo-sm">
            <img src={celoGlyph} alt="" height="36" />
          </span>
        </Link>
      </div>

      <nav className="navbar-custom">
        <ul className="navbar-right list-inline float-right mb-0">
          <li className="dropdown notification-list list-inline-item d-none d-md-inline-block mr-1">
            <form role="search" className="app-search">
              <div className="form-group mb-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search.."
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
          </li>
          <ProfileMenu />
        </ul>

        <ul className="list-inline menu-left mb-0">
          <li className="float-left">
            <button
              onClick={sidebarToggle}
              className="button-menu-mobile open-left waves-effect"
            >
              <i className="mdi mdi-menu"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Topbar;
