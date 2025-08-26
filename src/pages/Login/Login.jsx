import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Particles from "../../components/Particles/Particles";
import styles from "./Login.module.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validações básicas
    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      // Validações para cadastro
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

      try {
        // Cadastrar usuário
        const { data, error } = await supabase
          .from('usuarios')
          .insert([
            { 
              email: formData.email.toLowerCase().trim(), 
              senha: formData.password 
            }
          ])
          .select();

        if (error) {
          if (error.code === '23505') { // Violação de unique constraint
            setError("Este email já está cadastrado");
          } else {
            setError("Erro ao cadastrar: " + error.message);
          }
        } else {
          setSuccess("Conta criada com sucesso! Agora você pode fazer login.");
          setTimeout(() => {
            setIsSignUp(false);
            setFormData({ email: formData.email, password: "", confirmPassword: "" });
            setSuccess("");
          }, 2000);
        }
      } catch (err) {
        setError("Erro inesperado ao cadastrar");
        console.error('Erro de cadastro:', err);
      }
    } else {
      try {
        // Fazer login
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', formData.email.toLowerCase().trim())
          .eq('senha', formData.password)
          .single();

        if (error || !data) {
          setError("Email ou senha incorretos");
        } else {
          setSuccess("Login realizado com sucesso!");
          console.log('Usuário logado:', data);
          
          // Aqui você pode salvar o usuário no localStorage ou contexto
          localStorage.setItem('user', JSON.stringify(data));
          
          // Redirecionar ou fazer algo após login
          setTimeout(() => {
            alert("Bem-vindo ao AstroNexus!");
          }, 1000);
        }
      } catch (err) {
        setError("Erro inesperado ao fazer login");
        console.error('Erro de login:', err);
      }
    }

    setIsLoading(false);
  };

  const toggleMode = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    setIsSignUp(prevState => !prevState);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    const starsBg = document.getElementById("login-stars-bg");
    if (starsBg && starsBg.children.length === 0) {
      const numStars = windowWidth < 768 ? 50 : 100;
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

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1';
    }
  }, []);

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
              
              {/* Sistema Solar */}
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

              {/* Formulário */}
              <div style={{ 
                width: '100%', 
                maxWidth: showSolarSystem ? '28rem' : '100%', 
                position: 'relative', 
                margin: '0 auto',
                zIndex: 20
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
                    {/* Error Display */}
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

                    {/* Success Display */}
                    {success && (
                      <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                      }}>
                        {success}
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

                      {/* Confirm Password - Only in signup */}
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

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.submitButton}
                        style={{ position: 'relative', zIndex: 25 }}
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

                    <div style={{ 
                      marginTop: windowWidth <= 480 ? '1rem' : '1.5rem', 
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 25
                    }}>
                      <p style={{ 
                        fontSize: windowWidth <= 480 ? '0.8rem' : '0.875rem', 
                        color: 'rgba(156, 163, 175, 1)' 
                      }}>
                        {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
                        <button 
                          type="button"
                          onClick={toggleMode}
                          style={{ 
                            fontWeight: '500', 
                            color: 'white', 
                            textDecoration: 'none', 
                            transition: 'color 0.3s',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            position: 'relative',
                            zIndex: 30
                          }}
                        >
                          {isSignUp ? 'Fazer login' : 'Cadastre-se gratuitamente'}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
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
