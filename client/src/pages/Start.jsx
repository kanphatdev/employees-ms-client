import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserCheck, UserCog } from 'lucide-react';

const Portal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <div className="flex justify-center mb-4">
          <img src="./logo.svg" alt="Logo" width={50} height={50} />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-6 capitalize" style={{ color: '#52575D' }}>Sign In as</h1>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/adminlogin" 
            className="block w-full text-center py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-300"
            style={{ backgroundColor: '#ffb07c', color: '#fff', fontWeight: 'bold' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#52575D'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffb07c'}
          >
            <UserCog className="w-5 h-5"/>
            
            <span>Sign in as Administrator</span>
          </Link>
          
          <Link 
            to="/employee_login" 
            className="block w-full text-center py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-300"
            style={{ backgroundColor: '#e5a186', color: '#fff', fontWeight: 'bold' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#52575D'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e5a186'}
          >
            
            <UserCheck className="w-5 h-5" />
            <span>Sign in as Employee</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Portal;
