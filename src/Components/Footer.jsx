import React from 'react'
import { ArrowUpRight, Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-zinc-900 pt-16 pb-8 px-8 sm:px-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl font-serif font-bold tracking-tight">
              Food Atlas
            </h2>
            <p className="text-zinc-600 leading-relaxed max-w-sm">
              Bringing the world's flavors to your kitchen. Discover authentic recipes, 
              cultural stories, and detailed instructions for every dish.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Facebook className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Navigation Column (Span 3) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="font-medium text-lg mb-2">Explore</h3>
            <FooterLink href="/" label="Home" />
            <FooterLink href="/recipes" label="Recipes" />
            <FooterLink href="/admin" label="Admin"/>
            <FooterLink href="/contact" label="Contact" />
          </div>

          {/* Newsletter Column (Span 4) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="font-medium text-lg mb-2">Weekly Flavors</h3>
            <p className="text-zinc-600 text-sm">
              Join 10,000+ cooks getting fresh recipes weekly.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-zinc-50 border border-zinc-200 rounded px-4 py-2 w-full focus:outline-none focus:border-yellow-500 text-sm transition-colors placeholder:text-zinc-400"
              />
              <button className="bg-zinc-900 text-white px-4 py-2 rounded font-medium hover:bg-yellow-500 hover:text-black transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2025 Food Atlas. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper Components
function FooterLink({ href, label }) {
  return (
    <a href={href} className="group flex items-center gap-2 w-fit hover:text-yellow-500 transition-colors text-zinc-600 hover:font-medium">
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </a>
  )
}

function SocialLink({ icon, href }) {
  return (
    <a href={href} className="p-2 bg-zinc-100 rounded-full text-zinc-600 hover:bg-zinc-200 hover:text-yellow-500 transition-colors">
      {icon}
    </a>
  )
}