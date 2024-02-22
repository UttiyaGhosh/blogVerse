import React from 'react';
 
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-bold">Stay Connected</h3>
          <p className="mt-2">Join our newsletter for the latest updates.</p>
        </div>
        <div className="flex items-center space-x-4">
          <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">Subscribe</button>
        </div>
        <div className="mt-8 md:mt-0">
          <h3 className="text-xl font-bold">Follow Us</h3>
          <div className="flex mt-2">
            <a href="#" className="text-gray-300 hover:text-white mr-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.93c-3.5-.19-5.97-1.63-5.97-3.93V12h3.06v3.36h1.95V12h3.06v3.31c0 2.36-1.29 3.62-3.05 3.62h-.01z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;