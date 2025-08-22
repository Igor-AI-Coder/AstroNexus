import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Particles from "../../components/Particles/Particles";
import styles from "./Login.module.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Estado para alternar entre login e cadastro
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "" // Só usado no cadastro
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpar erro quando usuário digitar
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validações para cadastro
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não coincidem");
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres");
        setIsLoading(false);
        return;
      }
    }
    
    setTimeout(() => {
      console.log(isSignUp ? "Cadastro data:" : "Login data:", formData);
      setIsLoading(false);
      
      if (isSignUp) {
        // Simular sucesso no cadastro
        alert("Conta criada com sucesso! Agora você pode fazer login.");
        setIsSignUp(false); // Voltar para tela de login
        setFormData({ email: formData.email, password: "", confirmPassword: "" });
      } else {
        // Simular sucesso no login
        alert("Login realizado com sucesso!");
      }
    }, 2000);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setError("");
  };

  useEffect(() => {
    const starsBg = document.getElementById("login-stars-bg");
    if (starsBg && starsBg.children.length === 0) {
      const numStars = windowWidth < 768 ? 50 : 100; // Menos estrelas em mobile
      for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.className = styles.stars;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsBg.appendChild(star);
      }
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const showSolarSystem = windowWidth > 1030;

  return (
    <>
      <Header />
      <div className={styles.loginWrapper}>
        <div className={styles.starsBg} id="login-stars-bg"></div>
        <Particles />
        
        <main style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative', 
          zIndex: 10, 
          padding: windowWidth <= 768 ? '1rem 0.75rem 3rem' : '1rem 1rem 5rem'
        }}>
          <div style={{ 
            maxWidth: showSolarSystem ? '80rem' : '28rem', 
            width: '100%', 
            margin: '0 auto' 
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: showSolarSystem ? 'repeat(2, 1fr)' : '1fr',
              gap: windowWidth <= 768 ? '2rem' : '4rem', 
              alignItems: 'center',
              justifyItems: 'center'
            }}>
              
              {/* Sistema Solar - Só aparece acima de 1030px */}
              {showSolarSystem && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className={styles.solarSystemLogin}>
                    <div className={styles.sun} title="Sol"></div>
                    <div className={`${styles.orbit} ${styles.orbit1}`}>
                      <div className={`${styles.planet} ${styles.mercury}`} title="Mercúrio"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit2}`}>
                      <div className={`${styles.planet} ${styles.venus}`} title="Vênus"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit3}`}>
                      <div className={`${styles.planet} ${styles.earth}`} title="Terra"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit4}`}>
                      <div className={`${styles.planet} ${styles.mars}`} title="Marte"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit5}`}>
                      <div className={`${styles.planet} ${styles.jupiter}`} title="Júpiter"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit6}`}>
                      <div className={`${styles.planet} ${styles.saturn}`} title="Saturno"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit7}`}>
                      <div className={`${styles.planet} ${styles.uranus}`} title="Urano"></div>
                    </div>
                    <div className={`${styles.orbit} ${styles.orbit8}`}>
                      <div className={`${styles.planet} ${styles.neptune}`} title="Netuno"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Formulário de Login/Cadastro */}
              <div style={{ 
                width: '100%', 
                maxWidth: showSolarSystem ? '28rem' : '100%', 
                position: 'relative', 
                margin: '0 auto' 
              }}>
                <div className={styles.loginCard}>
                  {/* Header Section */}
                  <div style={{ 
                    position: 'relative', 
                    padding: windowWidth <= 480 ? '1.5rem 1rem 1rem' : '2rem 2rem 1.5rem' 
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.02), rgba(200, 200, 200, 0.02))' 
                    }}></div>
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      <div style={{ 
                        width: windowWidth <= 480 ? '3rem' : '4rem', 
                        height: windowWidth <= 480 ? '3rem' : '4rem', 
                        margin: '0 auto 1rem', 
                        borderRadius: '1rem', 
                        background: 'linear-gradient(to bottom right, #374151, #111827)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                        border: '1px solid rgba(255, 255, 255, 0.2)' 
                      }}>
                        <svg style={{ 
                          width: windowWidth <= 480 ? '1.5rem' : '2rem', 
                          height: windowWidth <= 480 ? '1.5rem' : '2rem', 
                          color: 'white' 
                        }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {isSignUp ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          )}
                        </svg>
                      </div>
                      <h1 style={{ 
                        fontSize: windowWidth <= 480 ? '1.25rem' : '1.5rem', 
                        fontWeight: 'bold', 
                        color: 'white', 
                        marginBottom: '0.5rem', 
                        fontFamily: 'monospace' 
                      }}>
                        {isSignUp ? 'Criar sua conta' : 'Bem-vindo de volta'}
                      </h1>
                      <p style={{ 
                        color: 'rgba(156, 163, 175, 1)', 
                        fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem' 
                      }}>
                        {isSignUp ? 'Junte-se ao AstroNexus' : 'Acesse sua conta no AstroNexus'}
                      </p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div style={{ 
                    padding: windowWidth <= 480 ? '0 1rem 1.5rem' : '0 2rem 2rem' 
                  }}>
                    {/* Mostrar erro se houver */}
                    {error && (
                      <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        color: '#ef4444',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                      }}>
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: windowWidth <= 480 ? '1rem' : '1.25rem' 
                    }}>
                      {/* Email Field */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{ 
                          display: 'block', 
                          fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem', 
                          fontWeight: '500', 
                          color: 'rgba(209, 213, 219, 1)' 
                        }}>
                          Endereço de e-mail
                        </label>
                        <div style={{ position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute', 
                            inset: '0 auto 0 0', 
                            paddingLeft: windowWidth <= 480 ? '0.5rem' : '0.75rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            pointerEvents: 'none' 
                          }}>
                            <svg style={{ 
                              height: windowWidth <= 480 ? '1rem' : '1.25rem', 
                              width: windowWidth <= 480 ? '1rem' : '1.25rem', 
                              color: 'rgba(156, 163, 175, 1)' 
                            }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="password" style={{ 
                          display: 'block', 
                          fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem', 
                          fontWeight: '500', 
                          color: 'rgba(209, 213, 219, 1)' 
                        }}>
                          Senha
                        </label>
                        <div style={{ position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute', 
                            inset: '0 auto 0 0', 
                            paddingLeft: windowWidth <= 480 ? '0.5rem' : '0.75rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            pointerEvents: 'none' 
                          }}>
                            <svg style={{ 
                              height: windowWidth <= 480 ? '1rem' : '1.25rem', 
                              width: windowWidth <= 480 ? '1rem' : '1.25rem', 
                              color: 'rgba(156, 163, 175, 1)' 
                            }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      {/* Confirm Password Field - Só aparece no cadastro */}
                      {isSignUp && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label htmlFor="confirmPassword" style={{ 
                            display: 'block', 
                            fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem', 
                            fontWeight: '500', 
                            color: 'rgba(209, 213, 219, 1)' 
                          }}>
                            Confirmar Senha
                          </label>
                          <div style={{ position: 'relative' }}>
                            <div style={{ 
                              position: 'absolute', 
                              inset: '0 auto 0 0', 
                              paddingLeft: windowWidth <= 480 ? '0.5rem' : '0.75rem', 
                              display: 'flex', 
                              alignItems: 'center', 
                              pointerEvents: 'none' 
                            }}>
                              <svg style={{ 
                                height: windowWidth <= 480 ? '1rem' : '1.25rem', 
                                width: windowWidth <= 480 ? '1rem' : '1.25rem', 
                                color: 'rgba(156, 163, 175, 1)' 
                              }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              required
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className={styles.input}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      )}

                      {/* Options - Só no login */}
                      {!isSignUp && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: windowWidth <= 480 ? 'flex-start' : 'center', 
                          justifyContent: 'space-between', 
                          fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem',
                          flexDirection: windowWidth <= 480 ? 'column' : 'row',
                          gap: windowWidth <= 480 ? '0.75rem' : '0'
                        }}>
                          <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                              type="checkbox"
                              style={{ 
                                height: windowWidth <= 480 ? '0.875rem' : '1rem', 
                                width: windowWidth <= 480 ? '0.875rem' : '1rem', 
                                accentColor: '#ffffff', 
                                marginRight: '0.5rem' 
                              }}
                            />
                            <span style={{ color: 'rgba(209, 213, 219, 1)' }}>Lembrar de mim</span>
                          </label>
                          <a href="#" style={{ 
                            color: 'white', 
                            textDecoration: 'none', 
                            transition: 'color 0.3s',
                            alignSelf: windowWidth <= 480 ? 'flex-start' : 'auto'
                          }}>
                            Esqueceu a senha?
                          </a>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.submitButton}
                      >
                        {isLoading ? (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg style={{ 
                              animation: 'spin 1s linear infinite', 
                              marginLeft: '-0.25rem', 
                              marginRight: '0.75rem', 
                              height: windowWidth <= 480 ? '1rem' : '1.25rem', 
                              width: windowWidth <= 480 ? '1rem' : '1.25rem', 
                              color: 'black' 
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {isSignUp ? 'Criando conta...' : 'Entrando...'}
                          </div>
                        ) : (
                          isSignUp ? "Criar conta" : "Entrar na conta"
                        )}
                      </button>
                    </form>

                    {/* Divider - Só no login */}
                    {!isSignUp && (
                      <div style={{ marginTop: windowWidth <= 480 ? '1rem' : '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '100%', borderTop: '1px solid rgba(107, 114, 128, 1)' }}></div>
                          </div>
                          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '0.875rem' }}>
                            <span style={{ 
                              padding: '0 0.5rem', 
                              background: showSolarSystem ? 'transparent' : 'rgba(31, 41, 55, 0.5)', 
                              color: 'rgba(156, 163, 175, 1)' 
                            }}>ou</span>
                          </div>
                        </div>

                        {/* Social Login */}
                        <div style={{ 
                          marginTop: '1rem', 
                          display: 'grid', 
                          gridTemplateColumns: windowWidth <= 480 ? '1fr' : 'repeat(2, 1fr)', 
                          gap: '0.75rem' 
                        }}>
                          <button className={styles.socialButton}>
                            <svg style={{ height: '1rem', width: '1rem' }} viewBox="0 0 24 24">
                              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span style={{ marginLeft: '0.5rem', fontSize: windowWidth <= 480 ? '0.8rem' : '0.75rem' }}>
                              {windowWidth <= 480 ? 'Continuar com Google' : 'Google'}
                            </span>
                          </button>

                          <button className={styles.socialButton}>
                            <svg style={{ height: '1rem', width: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span style={{ marginLeft: '0.5rem', fontSize: windowWidth <= 480 ? '0.8rem' : '0.75rem' }}>
                              {windowWidth <= 480 ? 'Continuar com Facebook' : 'Facebook'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Toggle Link */}
                    <div style={{ 
                      marginTop: windowWidth <= 480 ? '1rem' : '1.5rem', 
                      textAlign: 'center' 
                    }}>
                      <p style={{ 
                        fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem', 
                        color: 'rgba(156, 163, 175, 1)' 
                      }}>
                        {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
                        <button 
                          onClick={toggleMode}
                          style={{ 
                            fontWeight: '500', 
                            color: 'white', 
                            textDecoration: 'none', 
                            transition: 'color 0.3s',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {isSignUp ? 'Fazer login' : 'Cadastre-se gratuitamente'}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Security Info */}
                {!showSolarSystem && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <p style={{ 
                      fontSize: windowWidth <= 480 ? '0.7rem' : '0.75rem', 
                      color: 'rgba(107, 114, 128, 1)' 
                    }}>
                      🔒 Suas informações estão protegidas
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Login;
