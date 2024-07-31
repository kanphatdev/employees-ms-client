import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // For error handling
  const [loading, setLoading] = useState(false); // For loading state

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    setError(''); // Clear previous errors

    axios.post('http://localhost:5000/auth/adminlogin', values)
      .then(result => {
        console.log(result);
        // Handle successful login, e.g., redirect or show a success message
      })
      .catch(err => {
        console.error(err);
        setError('Login failed. Please try again.'); // Set error message
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request completes
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img src="./logo.svg" alt="Logo" width={50} height={50} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <User />
              </span>
              <input
                type="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="w-full py-2 px-3 focus:outline-none"
                placeholder="Enter your email"
                required
                autoComplete="off"
                name="email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <Lock />
              </span>
              <input
                type="password"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                className="w-full py-2 px-3 focus:outline-none"
                placeholder="Enter your password"
                required
                name="password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p> // Display error message
          )}
          <button
            type="submit"
            className={`w-full ${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
