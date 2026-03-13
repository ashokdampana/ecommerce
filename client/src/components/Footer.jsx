import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 mt-10 border-t bg-white text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Clothes Store. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;