// First, let's create a new NavBar component

// NavBar.jsx
import { useState } from 'react';
import './NavBar.css';

function NavBar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#home">
            <h2>Esha Sherry</h2>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          <span className="menu-text">{isMenuOpen ? 'Close' : 'Menu'}</span>
        </div>

        {/* Navigation menu */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a
              href="#home"
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#projects"
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#blogs"
              className={`nav-link ${activeSection === 'blogs' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;