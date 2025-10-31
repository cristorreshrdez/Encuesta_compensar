import { useNavigate } from "react-router-dom";
import { Hero } from "../assets/components/MainContent/Hero";
import { FormLogin } from "../assets/components/Login/FormLogin";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row lg:flex-row    items-center justify-center min-h-[93vh]  px-6 gap-56 ">
      <Hero
        titulo={"Bienvenidos"}
        subtitulo={"Ingresa y disfruta"}
        mensaje={"Si aun no tienes una cuenta "}
        mensaje2={"puedes"}
        linkText={"¡Regristrate aqui!"}
        onLinkClick={() => navigate("/register")}
      />
        {" "}
        <FormLogin title={"Iniciar Sesion"} fields={[
          { name: "name", type: "text", placeholder: "Email o Nombre" },
          { name: "password", type: "password", placeholder: "Contraseña" },
        ]} />
      </div>
    </div>
  );
};
