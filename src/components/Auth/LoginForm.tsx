import React, { useState } from 'react';
import { UserRole } from '../../types';

interface LoginFormProps {
  onLogin: (email: string, password: string, role: UserRole) => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, selectedRole);
  };

  const roles = [
    { value: UserRole.STUDENT, label: '🎓 Student', description: 'Přístup k herním režimům učení' },
    { value: UserRole.TEACHER, label: '👨‍🏫 Učitel', description: 'Správa tříd, osnov a materiálů' },
    { value: UserRole.PARENT, label: '👨‍👩‍👧‍👦 Rodič', description: 'Sledování pokroku dítěte' },
    { value: UserRole.PSYCHOLOGIST, label: '🧠 Psycholog', description: 'Analýza učebních stylů' },
    { value: UserRole.ADMIN, label: '⚙️ Admin', description: 'Správa celé platformy' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900 text-glass mb-2">
            EDU-AI Platform
          </h1>
          <p className="text-gray-600 text-glass">
            Inteligentní systém pro vzdělávání
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-card mb-4 p-3 border-red-200 bg-red-50">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 text-glass mb-3">
            Vyberte svou roli:
          </label>
          <div className="space-y-2">
            {roles.map((role) => (
              <label
                key={role.value}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  selectedRole === role.value
                    ? 'glass-card-hover bg-blue-50 border-blue-200'
                    : 'glass-button hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedRole === role.value}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-glass">
                    {role.label}
                  </div>
                  <div className="text-sm text-gray-600 text-glass">
                    {role.description}
                  </div>
                </div>
                {selectedRole === role.value && (
                  <div className="text-blue-500">✓</div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-glass mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full glass-button px-3 py-2 border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              placeholder="vase@email.cz"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-glass mb-1">
              Heslo
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full glass-button px-3 py-2 pr-10 border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full glass-card-hover py-3 px-4 text-white font-medium bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Přihlašování...
              </div>
            ) : (
              `Přihlásit se jako ${roles.find(r => r.value === selectedRole)?.label}`
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 glass-card p-4">
          <h3 className="text-sm font-medium text-gray-700 text-glass mb-2">
            Demo přístupy:
          </h3>
          <div className="text-xs text-gray-600 text-glass space-y-1">
            <div>👨‍🏫 Učitel: ucitel@demo.cz / heslo123</div>
            <div>🎓 Student: student@demo.cz / heslo123</div>
            <div>👨‍👩‍👧‍👦 Rodič: rodic@demo.cz / heslo123</div>
            <div>🧠 Psycholog: psycholog@demo.cz / heslo123</div>
            <div>⚙️ Admin: admin@demo.cz / heslo123</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 text-glass">
          <p>EDU-AI Platform v1.0</p>
          <p>Lokální AI • Kompletně offline</p>
        </div>
      </div>
    </div>
  );
};