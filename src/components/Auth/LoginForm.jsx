import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Lock, User, GraduationCap, ArrowLeft } from 'lucide-react';



const LoginForm = ({ onBackToLanding }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // CAPTCHA state
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const { signIn, signUp } = useAuth();

  // Generate new CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);
    setCaptchaAnswer('');
    setCaptchaVerified(false);
  };

  // Initialize CAPTCHA on component mount
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  // Regenerate CAPTCHA when switching between login/signup
  React.useEffect(() => {
    generateCaptcha();
  }, [isLogin]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return {
      length: password.length >= 6,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isValid: password.length >= 6 && hasUpperCase && hasLowerCase && hasNumber
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // CAPTCHA verification
      const correctAnswer = captchaNum1 + captchaNum2;
      if (parseInt(captchaAnswer) !== correctAnswer) {
        setError('Incorrect CAPTCHA answer. Please try again.');
        generateCaptcha();
        setLoading(false);
        return;
      }

      // Email validation for both login and signup
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      if (isLogin) {
        if (!password) {
          setError('Password is required');
          setLoading(false);
          return;
        }
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || 'Invalid email or password');
        } else {
          setSuccess('Login successful! Redirecting...');
        }
      } else {
        // Registration validation
        if (!fullName || fullName.trim().length < 2) {
          setError('Please enter your full name (at least 2 characters)');
          setLoading(false);
          return;
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          const errors = [];
          if (!passwordValidation.length) errors.push('at least 6 characters');
          if (!passwordValidation.hasUpperCase) errors.push('one uppercase letter');
          if (!passwordValidation.hasLowerCase) errors.push('one lowercase letter');
          if (!passwordValidation.hasNumber) errors.push('one number');
          setError(`Password must contain ${errors.join(', ')}`);
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const userData = {
          full_name: fullName,
          role: role
        };

        console.log('Attempting signup with:', { email, userData });
        const { error } = await signUp(email, password, userData);
        console.log('Signup result:', { error });
        
        if (error) {
          setError(error.message);
        }
        // User is automatically logged in after successful signup
        // No need to show success message or switch to login mode
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Demo accounts for testing
  const demoAccounts = [
    { role: 'Admin', email: 'admin@placementhub.edu', password: 'admin123' },
    { role: 'Student', email: 'student@placementhub.edu', password: 'student123' },
    { role: 'Employer', email: 'employer@company.com', password: 'employer123' },
    { role: 'Placement Officer', email: 'officer@placementhub.edu', password: 'officer123' }
  ];

  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLogin(true);
    generateCaptcha();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-5"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          )}
          
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              PlacementHub
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-shake">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-bounce">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  {success}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {!isLogin && (
                <div className="animate-slideDown">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required={!isLogin}
                      minLength={2}
                      maxLength={100}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                    {!isLogin && fullName && fullName.trim().length < 2 && (
                      <p className="text-xs text-red-500 mt-1">Name must be at least 2 characters</p>
                    )}
                  </div>
                </div>
              )}

              <div className={isLogin ? '' : 'animate-slideDown'}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                  {email && !validateEmail(email) && (
                    <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                  )}
                </div>
              </div>
              
              <div className={isLogin ? '' : 'animate-slideDown'}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    minLength={6}
                    maxLength={50}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {!isLogin && password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs">
                      <div className={`h-1 flex-1 rounded mr-1 ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded mr-1 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded mr-1 ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <p className="text-xs text-gray-600">Password must contain uppercase, lowercase, and number</p>
                  </div>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="animate-slideDown">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required={!isLogin}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="animate-slideDown">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    >
                      <option value="student">Student</option>
                      <option value="employer">Employer</option>
                      <option value="placement_officer">Placement Officer</option>
                    </select>
                  </div>
                </>
              )}

              {/* CAPTCHA Verification */}
              <div className="animate-slideDown">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Verification
                </label>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                      {captchaNum1} + {captchaNum2} = ?
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center"
                      title="Refresh CAPTCHA"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter the answer"
                    required
                  />
                  {captchaAnswer && parseInt(captchaAnswer) === (captchaNum1 + captchaNum2) && (
                    <p className="text-xs text-green-600 mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Correct!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn className="h-5 w-5 mr-2" />
                    ) : (
                      <UserPlus className="h-5 w-5 mr-2" />
                    )}
                    {isLogin ? 'Sign in' : 'Create Account'}
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </form>

          {isLogin && (
            <div className="mt-8 animate-fadeIn">
              <div className="text-center text-sm text-gray-600 mb-4">
                Demo Accounts (Click to auto-fill):
              </div>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => fillDemoCredentials(account.email, account.password)}
                    className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 hover:from-cyan-100 hover:to-blue-100 text-gray-700 hover:text-cyan-700 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    {account.role}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;