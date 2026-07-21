import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 text-stone-600">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 text-center">
        <p className="text-sm md:text-base font-heading font-medium tracking-wide text-stone-700">
          © {new Date().getFullYear()} Vincent Nwosu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
