import { useState } from "react";
import styles from "./Contato.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Regex patterns para validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+55\s?)?\(?([1-9]{2})\)?[\s-]?9?[0-9]{4}[\s-]?[0-9]{4}$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Remove o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (!nameRegex.test(formData.nome.trim())) {
      newErrors.nome = "Nome deve conter apenas letras e ter entre 2-50 caracteres";
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Por favor, insira um email válido";
    }

    // Validação do telefone (opcional)
    if (formData.telefone.trim() && !phoneRegex.test(formData.telefone.trim())) {
      newErrors.telefone = "Formato inválido. Use: (11) 99999-9999 ou +55 11 99999-9999";
    }

    // Validação do assunto
    if (!formData.assunto.trim()) {
      newErrors.assunto = "Assunto é obrigatório";
    } else if (formData.assunto.trim().length < 3) {
      newErrors.assunto = "Assunto deve ter pelo menos 3 caracteres";
    }

    // Validação da mensagem
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = "Mensagem é obrigatória";
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = "Mensagem deve ter pelo menos 10 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simula envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: ""
      });
      setErrors({});
    } catch (error) {
      setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Entre em Contato</h1>
            <p className={styles.heroSubtitle}>
              Conecte-se conosco e explore o universo juntos
            </p>
          </div>
          <div className={styles.starsBackground}></div>
        </div>

        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              {/* Informações de contato */}
              <div className={styles.contactInfo}>
                <h2>Fale Conosco</h2>
                <p>
                  Estamos aqui para responder suas dúvidas sobre astronomia, 
                  nossos produtos ou qualquer curiosidade sobre o cosmos.
                </p>

                <div className={styles.contactMethods}>
                  <div className={styles.contactItem}>
                    <i className="fas fa-envelope"></i>
                    <div>
                      <h3>Email</h3>
                      <p>contato@astronexus.com</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <i className="fas fa-phone"></i>
                    <div>
                      <h3>Telefone</h3>
                      <p>(11) 3456-7890</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <h3>Endereço</h3>
                      <p>Rua das Estrelas, 123<br />São Paulo - SP</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <i className="fas fa-clock"></i>
                    <div>
                      <h3>Horário de Atendimento</h3>
                      <p>Segunda à Sexta: 9h às 18h<br />Sábado: 9h às 14h</p>
                    </div>
                  </div>
                </div>

                <div className={styles.socialLinks}>
                  <h3>Redes Sociais</h3>
                  <div className={styles.socialIcons}>
                    <a href="#" aria-label="Facebook">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="YouTube">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Formulário de contato */}
              <div className={styles.contactForm}>
                <h2>Envie sua Mensagem</h2>
                
                {submitMessage && (
                  <div className={`${styles.message} ${
                    submitMessage.includes('sucesso') ? styles.success : styles.error
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className={errors.nome ? styles.error : ""}
                      placeholder="Seu nome completo"
                    />
                    {errors.nome && <span className={styles.errorMessage}>{errors.nome}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? styles.error : ""}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="telefone">Telefone (opcional)</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className={errors.telefone ? styles.error : ""}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.telefone && <span className={styles.errorMessage}>{errors.telefone}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="assunto">Assunto *</label>
                    <input
                      type="text"
                      id="assunto"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleInputChange}
                      className={errors.assunto ? styles.error : ""}
                      placeholder="Sobre o que você gostaria de falar?"
                    />
                    {errors.assunto && <span className={styles.errorMessage}>{errors.assunto}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="mensagem">Mensagem *</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      className={errors.mensagem ? styles.error : ""}
                      placeholder="Escreva sua mensagem aqui..."
                      rows="6"
                    ></textarea>
                    {errors.mensagem && <span className={styles.errorMessage}>{errors.mensagem}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
