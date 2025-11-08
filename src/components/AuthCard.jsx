import { useState } from 'react';

const AuthCard = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');


    if (email === 'abc@def.com' && password === 'password') {
      const mockToken = btoa(JSON.stringify({ email, exp: Date.now() + 3600000 }));
      onLogin(mockToken);
      onClose();
    } else {
      setError('Invalid credentials. Use: abc@def.com / password');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-md w-full p-8 border-2 border-primary card-shadow glow-gold animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary text-glow mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to explore the galaxy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="abc@def.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="password"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/20 border border-destructive rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 hover:glow-gold transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-background/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Demo Credentials:<br />
            <span className="text-foreground font-mono">abc@def.com</span> /
            <span className="text-foreground font-mono"> password</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
