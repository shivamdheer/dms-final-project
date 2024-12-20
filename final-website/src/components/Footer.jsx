import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-12 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Project Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
              <p className="font-medium text-gray-800 dark:text-white">Dedeepya Guntaka</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Net ID: dg4489</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">NYU ID: N18304471</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
              <p className="font-medium text-gray-800 dark:text-white">Shivam Dheer</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Net ID: sd6080</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">NYU ID: N18103074</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
              <p className="font-medium text-gray-800 dark:text-white">Varun Putta</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Net ID: vsp7221</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">NYU ID: N10489122</p>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">Database Systems (CSCI-GA.2433-001)</p>
            <p className="text-sm">New York University</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;