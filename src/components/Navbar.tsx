import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Mock badge counts
  const wishlistCount = 2;
  const cartCount = 1;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-[#f5f6f1]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Side: Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 z-50">
            {/* Geometric Mandala SVG */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#b8922a]"
            >
              <g transform="translate(50 50)">
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(45)" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(90)" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(135)" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(180)" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(225)" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(270)" />
                <path d="M0 -40 C15 -20 15 -10 0 0 C-15 -10 -15 -20 0 -40Z" transform="rotate(315)" />
                <circle cx="0" cy="0" r="8" fill="#f5f6f1" />
                <circle cx="0" cy="0" r="3" fill="currentColor" />
              </g>
            </svg>
            <span className="font-display text-[22px] text-[#7f340f] tracking-wide">
              Rasākr
            </span>
          </Link>

          {/* Right Side: Icons & Search */}
          <div className="flex items-center gap-5 text-[#7f340f] relative z-50">
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  key="search-input"
                  layoutId="search-container"
                  initial={{ opacity: 0, width: 40 }}
                  animate={{ opacity: 1, width: 240 }}
                  exit={{ opacity: 0, width: 40 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="relative flex items-center"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) setIsSearchOpen(false);
                    }}
                    placeholder="Search assets..."
                    className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-[#b8922a] text-[#7f340f] placeholder:text-[#7f340f]/50 focus:outline-none focus:ring-1 focus:ring-[#b8922a] font-sans text-sm"
                  />
                  <Search className="absolute left-3 w-4 h-4 text-[#b8922a]" />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="absolute right-3 text-[#b8922a] hover:text-[#7f340f]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-5"
                >
                  <motion.button
                    layoutId="search-container"
                    onClick={() => setIsSearchOpen(true)}
                    className="hover:text-[#b8922a] transition-colors flex items-center justify-center w-10 h-10 rounded-full"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>

                  <Link to="/wishlist" className="relative hover:text-[#b8922a] transition-colors">
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#b8922a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link to="/cart" className="relative hover:text-[#b8922a] transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#b8922a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 hover:text-[#b8922a] transition-colors relative w-6 h-6 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#0a0703]/40 z-40 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[75vw] max-w-[320px] bg-[#f5f6f1] z-50 shadow-2xl flex flex-col pt-24 px-8 pb-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <Link
                  to="/community"
                  className="font-display text-2xl text-[#7f340f] hover:text-[#b8922a] transition-colors"
                >
                  Community
                </Link>
                <Link
                  to="/concierge"
                  className="font-display text-2xl text-[#7f340f] hover:text-[#b8922a] transition-colors"
                >
                  Our Concierge
                </Link>
                <Link
                  to="/explore"
                  className="font-display text-2xl text-[#7f340f] hover:text-[#b8922a] transition-colors"
                >
                  Explore
                </Link>
                <Link
                  to="/origin"
                  className="font-display text-2xl text-[#7f340f] hover:text-[#b8922a] transition-colors"
                >
                  Our Origin
                </Link>
              </div>

              <div className="w-full h-px bg-[#b8922a] my-8 opacity-50" />

              <div className="flex flex-col gap-4">
                <Link
                  to="/account"
                  className="font-body text-lg text-[#9ca3af] hover:text-[#7f340f] transition-colors"
                >
                  Accounts
                </Link>
                <Link
                  to="/orders"
                  className="font-body text-lg text-[#9ca3af] hover:text-[#7f340f] transition-colors"
                >
                  Orders
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
