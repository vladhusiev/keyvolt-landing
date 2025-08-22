"use client";

import { getOptimizedImageUrl } from "@/app/utlis/image-optimization";
import { menuItems, MenuItem } from "@/app/utlis/menu-items";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Button from "../custom/Button/button";
import styles from "./navbar.module.css";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (itemId: string) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    const handleInitialHash = () => {
      if (window.location.hash && pathname === "/") {
        const elementId = window.location.hash.replace("#", "");
        const element = document.getElementById(elementId);
        if (element) {
          setTimeout(() => {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });

            window.history.replaceState(null, "", window.location.pathname);
          }, 100);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleInitialHash);

    handleInitialHash();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleInitialHash);
    };
  }, [pathname]);

  const getTargetHref = (href: string | undefined) => {
    if (!href) return "#";
    const isExternalLink = !href.startsWith("#");
    return isExternalLink ? href : pathname === "/" ? href : `/${href}`;
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string | undefined
  ) => {
    if (!href || href.startsWith("#")) {
      const onHomePage = pathname === "/";
      if (onHomePage && href) {
        e.preventDefault();
        const id = href.replace("#", "");
        scrollToElement(id);
      }
    }
    closeAllMenus();
  };

  const createClickHandler = (href: string | undefined) => {
    const isExternalLink = href && !href.startsWith("#");
    return isExternalLink
      ? closeAllMenus
      : (e: React.MouseEvent<HTMLAnchorElement>) =>
          handleMenuItemClick(e, href);
  };

  const renderDropdownItem = (child: MenuItem) => {
    const targetHref = getTargetHref(child.href);

    return (
      <li key={child.id} className={styles.dropdownItem}>
        <Link
          href={targetHref}
          className={styles.dropdownLink}
          onClick={createClickHandler(child.href)}
        >
          {child.label}
        </Link>
      </li>
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const targetHref = getTargetHref(item.href);

    return (
      <li key={item.id} className={styles.menuItem}>
        <Link
          href={targetHref}
          className={styles.menuLink}
          onClick={createClickHandler(item.href)}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  const renderDropdownMenuItem = (item: MenuItem) => {
    return (
      <li key={item.id} className={styles.menuItem}>
        <div
          className={clsx(
            styles.menuLinkWithDropdown,
            openDropdown === item.id ? styles.dropdownActive : ""
          )}
          onClick={() => toggleDropdown(item.id)}
        >
          <span className={styles.menuLink}>{item.label}</span>
          <ChevronDown size={16} className={styles.dropdownArrow} />
        </div>
        <ul
          className={clsx(
            styles.dropdown,
            openDropdown === item.id ? styles.dropdownOpen : ""
          )}
        >
          {item.children?.map(renderDropdownItem)}
        </ul>
      </li>
    );
  };

  return (
    <nav className={clsx(styles.navbar, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src={getOptimizedImageUrl("/images/logo.svg", {
              width: 120,
              height: 40,
              quality: 90,
            })}
            alt="KeyVolt"
            className={styles.logoImage}
            width={120}
            height={40}
            priority
          />
        </Link>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
          <ul className={styles.menuList}>
            {menuItems.map((item) =>
              item.children
                ? renderDropdownMenuItem(item)
                : renderMenuItem(item)
            )}
          </ul>
        </div>
        <Button
          variant="altLight"
          className={styles.contactButton}
          onClick={() => {
            const el = document.getElementById("contacts");
            if (el) {
              scrollToElement("contacts");
            } else {
              router.push("/#contacts");
            }
          }}
        >
          Контактна форма
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
