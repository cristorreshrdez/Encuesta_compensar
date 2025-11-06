import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../assets/components/MainContent/Hero";
import { FormLogin } from "../assets/components/Login/FormLogin";
import { loginApi } from "../services/api";

export const Login = () => {
  const navigate = useNavigate();

  
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    emailOrUser?: string;
    password?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!emailOrUser.trim()) {
      newErrors.emailOrUser = "Este campo es obligatorio";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
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

    
      await loginApi(emailOrUser, password);

    
      sessionStorage.setItem("user", emailOrUser);

      navigate("/survey");
    } catch (err: any) {
      setApiError(err.message || "Error al iniciar sesión");
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
          titulo={"Bienvenido"}
          subtitulo={"Ingresa y disfruta"}
          mensaje={"Si aun no tienes una cuenta "}
          mensaje2={"puedes"}
          linkText={"¡Regristrate aqui!"}
          onLinkClick={() => navigate("/register")}
        />

        <FormLogin
          title={"Iniciar Sesion"}
          fields={[
            {
              name: "emailOrUser",
              type: "text",
              placeholder: "Email o Nombre",
              value: emailOrUser,
              onChange: (e) => setEmailOrUser(e.target.value),
              error: errors.emailOrUser,
            },
            {
              name: "password",
              type: "password",
              placeholder: "Contraseña",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              error: errors.password,
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
