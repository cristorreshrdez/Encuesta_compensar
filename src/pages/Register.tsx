import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../assets/components/MainContent/Hero";
import { FormLogin } from "../assets/components/Login/FormLogin";
import { registerApi } from "../services/api";

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Formato de email no válido";
    }

    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio";
    }

    if (!phone.trim()) {
      newErrors.phone = "El número de celular es obligatorio";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    try {
      setLoading(true);

      await registerApi({
        email,
        username,
        phone,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      setApiError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="
          flex flex-col lg:flex-row
          items-center justify-center
          min-h-[93vh]
          px-4 sm:px-6 lg:px-6
          gap-10 lg:gap-56
        "
      >
        <Hero
          titulo={"Registrate"}
          subtitulo={"Te invitamos a crear tu cuenta"}
          mensaje={"Si ya tienes una cuenta"}
          mensaje2={"puedes"}
          linkText={"Iniciar sesion aqui !"}
          onLinkClick={() => navigate("/")}
        />
      
        <FormLogin
          title={"Registrate"}
          fields={[
            {
              name: "email",
              type: "email",
              placeholder: "Email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              error: errors.email,
            },
            {
              name: "username",
              type: "text",
              placeholder: "Nombre de usuario",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              error: errors.username,
            },
            {
              name: "phone",
              type: "text",
              placeholder: "Número de celular",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              error: errors.phone,
            },
            {
              name: "password",
              type: "password",
              placeholder: "Contraseña",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              error: errors.password,
            },
            {
              name: "confirmPassword",
              type: "password",
              placeholder: "Confirmar contraseña",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              error: errors.confirmPassword,
            },
          ]}
          apiError={apiError}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
