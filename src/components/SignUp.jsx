import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful signup
import { signupUser } from '../services/auth'; // Auth service function for sign up
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide Icons for visibility toggle

const SignUp = () => {
  const [name, setName] = useState(''); // New state for user's name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Role state (default to user)
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // To toggle confirm password visibility
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      // Call signup service and pass the role
      const response = await signupUser({ name, email, password, role });

      // Store JWT token in localStorage
      localStorage.setItem('token', response.token);

      // Redirect to Home after successful signup
      navigate('/'); 
    } catch (err) {
      // Show error if signup fails
      setError(err.message || 'Error during registration, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
        
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              required
            />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
          <div className="space-y-2 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2 relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
            </div>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              required
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-200"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-500 hover:underline">
                Log in
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
