import { signIn } from 'next-auth/react';
import { useState } from 'react';
 
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      // Handle login success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Login error:', error);
      // Handle login failure, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };
 
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signIn('google');
      // Handle Google login success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Google login error:', error);
      // Handle Google login failure, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };
 
  const handleRegistrationLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowRegistration(true);
  };
 
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-8">User Login</h2>
      <form onSubmit={handleLogin} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login with Google'}
          </button>
          <p className="text-sm">Don't have an account? <button onClick={handleRegistrationLink} className="text-blue-500 focus:outline-none">Register here</button>.</p>
        </div>
      </form>
      {showRegistration && (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">User Registration</h2>
          <form action="/register" method="POST">
            <div className="mb-4">
              <label htmlFor="reg-username" className="block text-gray-700">Username:</label>
              <input type="text" id="reg-username" name="username" className="form-input mt-1 block w-full" required />
            </div>
            <div className="mb-6">
              <label htmlFor="reg-password" className="block text-gray-700">Password:</label>
              <input type="password" id="reg-password" name="password" className="form-input mt-1 block w-full" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};
 
export default LoginForm;