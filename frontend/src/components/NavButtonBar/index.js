import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './NavButtonBar.css';

import bookClosed from '../../assets/ClosedBook.png';
import bookOpen from '../../assets/OpenBook.png';

const pages = [
  { name: 'About', route: '/about' },
  { name: 'Bulletin Board', route: '/' },
  { name: 'Personal Board', route: '/personal-board' },
  { name: 'How-To', route: '/how-to' }
];

const NavButtonBar = ({ currentPage }) => {
  const [hoveredIcon, setHoveredIcon] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(false);

  const isHovered = hoveredIcon || hoveredTab;
  const filteredPages = pages.filter(
    page => page.name.toLowerCase().replace(/\s+/g, '-') !== currentPage
  );

  return (
    <div
  className="book-nav"
  onMouseEnter={() => setHoveredIcon(true)}
  onMouseLeave={() => setHoveredIcon(false)}
>
  {/* Book Icon */}
  <div
    className={"book-icon"}
    style={{
      width: isHovered ? '280px' : '140px',
      right: isHovered ? '-40px' : '0px',
      height: '140px',
      backgroundImage: `url(${isHovered ? bookOpen : bookClosed})`,
      transition: 'all 0.3s ease',
      zIndex: '1'
    }}
  />

  {/* Tabs go here, OUTSIDE of the book-icon */}
  {filteredPages.map((page, i) => (
    <a
      key={page.name}
      href={page.route}
      className="book-tab"
      onMouseEnter={() => setHoveredTab(true)}
      onMouseLeave={() => setHoveredTab(false)}
      style={{
        top: `${i * 25 + 18}px`,
        width: isHovered ? '120px' : '25px',
        right: isHovered ? '-90px' : '0px',
        transition: 'all 0.3s ease',
        zIndex: isHovered ? 1 : 0
      }}
    >
      <span
      className="tab-label"
      style={{
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      {page.name}
    </span>
    </a>
  ))}
  </div>
  );
};

export default NavButtonBar;