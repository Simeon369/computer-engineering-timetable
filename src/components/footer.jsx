import React from 'react';

export default function footer() {
  return (
    <footer className="absolute bottom-0 w-full mt-10 bg-gray-100 text-center text-sm text-gray-600 py-4">
      <p>
        @{new Date().getFullYear()} Simeon Ogunyinka. All rights reserved. | 
        <a
          href="https://www.linkedin.com/in/simeon-ogunyinka-89144b280/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
         {' '} LinkedIn
        </a>
      </p>
    </footer>
  );
}
