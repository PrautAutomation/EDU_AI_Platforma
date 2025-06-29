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
    <div className="min-h-screen flex items-center justify-center p-4 animate-slide-in-glass">
      <div className="glass-card w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse-glass">🎓</div>
          <h1 className="text-3xl font-bold text-glass mb-2">
            EDU-AI Platform
          </h1>
          <p className="text-glass-light text-lg">
            Inteligentní systém pro vzdělávání
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-badge glass-badge-error mb-4 p-3 w-full text-center">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-glass mb-4">
            Vyberte svou roli:
          </label>
          <div className="space-y-3">
            {roles.map((role) => (
              <label
                key={role.value}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                  selectedRole === role.value
                    ? 'glass-tab-active border-2'
                    : 'glass-tab'
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
                  <div className="font-semibold text-glass text-lg">
                    {role.label}
                  </div>
                  <div className="text-sm text-glass-muted mt-1">
                    {role.description}
                  </div>
                </div>
                {selectedRole === role.value && (
                  <div className="text-2xl text-blue-600 ml-3">✓</div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-glass mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full glass-button px-4 py-3 text-lg font-medium"
              placeholder="vase@email.cz"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-glass mb-2">
              🔐 Heslo
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full glass-button px-4 py-3 pr-12 text-lg font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-glass hover:text-glass-light transition-colors"
              >
                <span className="text-xl">{showPassword ? '👁️' : '🙈'}</span>
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 text-white font-bold text-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 glass-card-hover shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                <span>Přihlašování...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">🚀</span>
                {`Přihlásit se jako ${roles.find(r => r.value === selectedRole)?.label}`}
              </span>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 glass-card p-5">
          <h3 className="text-sm font-bold text-glass mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Demo přístupy:
          </h3>
          <div className="grid grid-cols-1 gap-2 text-sm text-glass-muted">
            <div className="glass-button p-2 text-center font-medium">👨‍🏫 Učitel: <span className="text-glass font-semibold">ucitel@demo.cz</span></div>
            <div className="glass-button p-2 text-center font-medium">🎓 Student: <span className="text-glass font-semibold">student@demo.cz</span></div>
            <div className="glass-button p-2 text-center font-medium">👨‍👩‍👧‍👦 Rodič: <span className="text-glass font-semibold">rodic@demo.cz</span></div>
            <div className="glass-button p-2 text-center font-medium">🧠 Psycholog: <span className="text-glass font-semibold">psycholog@demo.cz</span></div>
            <div className="glass-button p-2 text-center font-medium">⚙️ Admin: <span className="text-glass font-semibold">admin@demo.cz</span></div>
            <div className="text-center mt-2 text-xs text-glass-muted">
              <span className="glass-badge">Všechna hesla: <strong>heslo123</strong></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="glass-badge glass-badge-info">
            <span className="font-bold">EDU-AI Platform v1.0</span>
          </div>
          <p className="mt-2 text-xs text-glass-muted font-medium">
            🔒 Lokální AI • 🌐 Kompletně offline • 🎯 Bezpečné
          </p>
        </div>
      </div>
    </div>
  );
};