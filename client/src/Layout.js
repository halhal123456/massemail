import React from "react";
import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <nav className="container">
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                aria-current="page"
                style={{ color: "black" }}
              >
                首页
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/massemail"
                className="nav-link"
                style={{ color: "black" }}
              >
                群发邮件
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: "black" }}>
                技术支持
              </Link>
            </li>
            <li className="nav-item" style={{ color: "black" }}>
              <Link to="/" className="nav-link" style={{ color: "black" }}>
                关于
              </Link>
            </li>
          </ul>
        </header>
      </nav>
      <Outlet />
    </div>
  );
};
