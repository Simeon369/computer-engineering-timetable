import React from 'react';

export default function Footer() {
  return (
    <footer className=" w-full text-center text-sm text-black/80 py-6 backdrop-blur-md bg-white/5 border-t border-white/10 shadow-inner">
      <p className="tracking-wide">
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Simeon Ogunyinka</span>. All rights reserved. |
        <a
          href="https://www.linkedin.com/in/simeon-ogunyinka-89144b280/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-cyan-500 hover:underline hover:text-cyan-300 transition duration-200"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
