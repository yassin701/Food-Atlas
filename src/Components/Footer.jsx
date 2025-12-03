import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-950 px-8 sm:px-12">
          <div className="sm:flex justify-between sm:gap-8 py-8 sm:px-20">
            <div className="left max-w-md">
              <div className="text-3xl font-serif font-bold text-zinc-950 mb-4">
                Food Atlas
              </div>
              <p className="font-serif text-lg text-zinc-700">
                Bringing the world's flavors to your kitchen with authentic
                recipes and detailed instructions.
              </p>
            </div>
            <div className="right mt-8 flex gap-8 sm:gap-20">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-medium">Pages</h1>
                <a
                  href="/"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/recipes"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Recipes</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/contact"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/admin"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Admin</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>
          <p className="text-center py-4 text-zinc-600 border-t border-zinc-200">
            © 2025 Food Atlas. All rights reserved.
          </p>
        </footer>
  )
}
