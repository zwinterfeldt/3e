import React from "react";
import styles from "./navbar.module.css";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Share Files", href: "/about" },
  { name: "Calendar and Email", href: "/contact" },
  { name: "Guest Lists", href: "/guestlist" },
];

const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navbar;
