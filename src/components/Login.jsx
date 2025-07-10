import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import { loginUser } from '../services/auth'; // Auth service function
import { Eye, EyeOff } from 'lucide-react'; // Importing Eye icons for password visibility toggle

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id);
      navigate('/'); // Redirect to Home
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h1>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none transition duration-200"
              required
            />
            {/* Password Visibility Toggle Icon */}
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-200"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-indigo-500 hover:underline">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
