"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="B-IMPACT Alliance"
            width={128}
            height={128}
            className="h-12 w-12 object-contain"
          />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            B-IMPACT <span className="text-primary">Alliance</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            소개
          </Link>
          <Link
            href="/#values"
            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            핵심가치
          </Link>
          <Link
            href="/organizations"
            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            참여기관
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            문의
          </Link>
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/organizations"
            className="hidden md:inline-flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
          >
            참여기관 보기
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3">
          <Link
            href="/#about"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-2"
          >
            소개
          </Link>
          <Link
            href="/#values"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-2"
          >
            핵심가치
          </Link>
          <Link
            href="/organizations"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-primary py-2"
          >
            참여기관
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-2"
          >
            문의
          </Link>
        </div>
      )}
    </header>
  );
}
