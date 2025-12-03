import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header-container sticky top-0 z-50 bg-white">
      {/* Utility Bar */}
      <div className="bg-yellow-400 text-white">
        <div className="flex justify-between p-2 px-4 sm:px-8">
          <div className="flex gap-4 text-sm">
            <a href="tel:+212716209164" className="flex items-center hover:text-yellow-200 transition">
              <Phone className="w-3 h-3 mr-1" />
              <span>+212 716209164</span>
            </a>
            <a href="mailto:info@foodatlas.com" className="flex items-center hover:text-yellow-200 transition">
              <Mail className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">info@foodatlas.com</span>
            </a>
          </div>
          <div className="hidden sm:flex gap-4">
            <a href="#" className="hover:text-yellow-200">Facebook</a>
            <a href="#" className="hover:text-yellow-200">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-zinc-950 bg-white">
        <div className="flex justify-between px-4 sm:px-8 items-center py-4">
          <div className="text-2xl font-sans font-bold text-zinc-950">
            <a href="/">Food Atlas</a>
          </div>

          <div className="hidden sm:flex gap-8 font-normal text-zinc-950">
            <a href="/" className="hover:text-yellow-500 hover:font-medium transition">Home</a>
            <a href="/recipes" className="hover:text-yellow-500 hover:font-medium transition">Recipes</a>
            <a href="/contact" className="hover:text-yellow-500 hover:font-medium transition">Contact</a>
            <a href="/admin" className="hover:text-yellow-500 hover:font-medium transition">Admin</a>
          </div>

         
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block sm:hidden text-zinc-950 text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-950 flex flex-col gap-4 items-center py-4 bg-white text-zinc-950 text-xl shadow-lg absolute w-full left-0 z-50">
          <a href="/" className="hover:text-yellow-500" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="/recipes" className="hover:text-yellow-500" onClick={() => setIsMobileMenuOpen(false)}>Recipes</a>
          <a href="/contact" className="hover:text-yellow-500" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <a href="/admin" className="hover:text-yellow-500" onClick={() => setIsMobileMenuOpen(false)}>Admin</a>

        </div>
      )}
    </header>
  );
}