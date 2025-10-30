import { useNavigate } from "react-router-dom";
import { Hero } from "../MainContent/Hero";


export const Login = () => {
const navigate = useNavigate()
    return (
        <div>
            <Hero
            titulo={"Bienvenido"}
            subtitulo={"Ingresa y disfruta"}
            mensaje={"Si aun no tienes una cuenta"}
            mensaje2={"puedes"}
            linkText={"Registrarte aqui"}
            onLinkClick={() => navigate("/register")}
            />
        </div>
    )
}