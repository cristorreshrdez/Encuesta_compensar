import { useNavigate } from "react-router-dom";
import { Hero } from "../assets/components/MainContent/Hero";
import { FormRegister } from "../assets/components/Login/FormRegister";


export const Register = () => {
const navigate = useNavigate();

return (
    <div>
    <div className="flex flex-row lg:flex-row items-center justify-center min-h-[93vh] px-6 gap-56">
        <Hero
        titulo={"Regístrate"}
        subtitulo={"Te invitamos a crear tu cuenta"}
        mensaje={"Si ya tienes una cuenta"}
        mensaje2={"puedes"}
        linkText={"Inicia sesión aquí!"}
        onLinkClick={() => navigate("/")}
        />

        <FormRegister
        title={"Regístrate"}
        fields={[
            { name: "email", type: "email", placeholder: "Correo electrónico" },
            { name: "username", type: "text", placeholder: "Nombre de usuario" },
            { name: "phone", type: "text", placeholder: "Número de celular" },
            { name: "password", type: "password", placeholder: "Contraseña" },
            {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirmar contraseña",
            },
        ]}
        />
    </div>
    </div>
);
};
