import React, { useState } from 'react';
import { Camera, Car, Shield, Users, Mail, Loader2 } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────────────────────

const LoginScreen = ({ onLogin, userType, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = () => { 
    setLoading(true); 
    setTimeout(() => { 
      setLoading(false); 
      onLogin(); 
    }, 1500); 
  };

  const handleResetPassword = () => { 
    setLoading(true); 
    setTimeout(() => { 
      setLoading(false); 
      setResetSent(true); 
    }, 1500); 
  };

  const userTypes = [
    { id: 'driver', label: 'Vehicle Owner', icon: Car, color: 'from-blue-500 to-cyan-500' },
    { id: 'enforcer', label: 'Traffic Enforcer', icon: Shield, color: 'from-orange-500 to-red-500' },
    { id: 'supervisor', label: 'Supervisor/Admin', icon: Users, color: 'from-violet-500 to-purple-500' },
  ];

  // Forgot Password Screen
  if (forgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <button onClick={() => { setForgotPassword(false); setResetSent(false); }} className="text-white/60 hover:text-white mb-4 flex items-center gap-2 text-sm">
            ← Back to Login
          </button>
          {resetSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-white/60 mb-6">We've sent password reset instructions to your email address.</p>
              <button onClick={() => { setForgotPassword(false); setResetSent(false); }} className="text-blue-400 hover:underline">
                Return to Login
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-white/60 mb-6">Enter your email to receive reset instructions</p>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 mb-4" 
              />
              <button onClick={handleResetPassword} disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : 'Send Reset Link'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Main Login Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">STVMS</h1>
          <p className="text-white/60">Smart Traffic Violation Monitoring System</p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <p className="text-white/60 text-sm mb-3 text-center">Select your role</p>
          <div className="grid grid-cols-3 gap-2">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setUserType(type.id)}
                className={`p-3 rounded-xl border transition-all ${
                  userType === type.id 
                    ? `bg-gradient-to-r ${type.color} border-transparent shadow-lg` 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <type.icon className={`w-5 h-5 mx-auto mb-1 ${userType === type.id ? 'text-white' : 'text-white/60'}`} />
                <p className={`text-xs ${userType === type.id ? 'text-white font-medium' : 'text-white/60'}`}>
                  {type.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
            <input type="checkbox" className="rounded" />
            Remember me
          </label>
          <button onClick={() => setForgotPassword(true)} className="text-blue-400 text-sm hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 bg-gradient-to-r ${userTypes.find(t => t.id === userType)?.color} text-white font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            `Sign in as ${userTypes.find(t => t.id === userType)?.label}`
          )}
        </button>

        {/* Footer */}
        {userType === 'driver' && (
          <p className="text-center text-white/40 text-sm mt-6">
            Don't have an account?{' '}
            <button className="text-blue-400 hover:underline">Register Now</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
