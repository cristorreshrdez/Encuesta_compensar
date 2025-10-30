import { useNavigate } from "react-router-dom";
import { Hero } from "../assets/components/MainContent/Hero";
import { FormLogin } from "../assets/components/Login/FormLogin";

export const Register = () => {
const navigate = useNavigate()
    return (
        <div>
            <div className="flex flex-row lg:flex-row    items-center justify-center min-h-[93vh]  px-6 gap-56 ">
            
            <Hero
            titulo={"Registrate"}
            subtitulo={"Te invitamos a crear tu cuenta"}
            mensaje={"Si ya tienes una cuenta"}
            mensaje2={"puedes"}
            linkText={"Iniciar sesion aqui !"}
            onLinkClick={() => navigate("/")}      
            />
            {""}
            <FormLogin title={"Registrate"} fields={[
                {name: "name", type: "Email", placeholder: "Email"},
                {name: "password", type: "text", placeholder: "Nombre de usuario"},
                {name: "name", type: "text", placeholder: "Número de celular"},
                {name: "password", type: "password", placeholder: "Contraseña"},
                {name: "password", type: "password", placeholder: "Confirmar contraseña"},
            ]} />
            </div>
        </div>
    );
};