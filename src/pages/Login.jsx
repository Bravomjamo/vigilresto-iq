import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* System Name / Logo Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>VIGILRESTO IQ</h1>
          <div style={styles.accentLine}></div>
          <p style={styles.subtitle}>Sign in to your administration panel</p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#030303',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    margin: 0,
    padding: '20px',
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#0a0a0a',
    padding: '40px',
    borderRadius: '8px',
    border: '1px solid #1a1a1a',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '35px',
  },
  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '3px',
    margin: '0 0 10px 0',
  },
  accentLine: {
    width: '40px',
    height: '2px',
    backgroundColor: '#ffffff',
    margin: '0 auto 12px auto',
  },
  subtitle: {
    color: '#666666',
    fontSize: '13px',
    margin: 0,
    letterSpacing: '0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#888888',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  input: {
    backgroundColor: '#121212', 
    border: '1px solid #222222', 
    borderRadius: '4px',
    padding: '14px 16px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  button: {
    backgroundColor: '#ffffff', 
    color: '#000000',
    border: 'none',
    borderRadius: '4px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'opacity 0.2s',
  }
};

export default Login;