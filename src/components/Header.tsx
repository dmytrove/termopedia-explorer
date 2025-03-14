
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/ui/motion';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md",
        scrolled 
          ? "bg-background/80 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Motion animate="slide-down" duration={600}>
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight hover:opacity-80 transition-opacity flex items-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Термопедія
            </span>
          </Link>
        </Motion>
        
        <Motion animate="slide-down" duration={600} delay={100}>
          <nav className="space-x-8">
            <NavLink to="/" current={location.pathname === "/"}>
              Головна
            </NavLink>
            <NavLink to="/about" current={location.pathname === "/about"}>
              Про проект
            </NavLink>
          </nav>
        </Motion>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative py-1 font-medium transition-colors",
        current 
          ? "text-primary" 
          : "text-foreground/80 hover:text-foreground"
      )}
    >
      {children}
      {current && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
      )}
    </Link>
  );
};

export default Header;
