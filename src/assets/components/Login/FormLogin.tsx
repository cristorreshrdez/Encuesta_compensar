import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { imagesSocial } from "../../data/imagesSocial";
import { InputForm } from "../MainContent/InputForm";
import { loginUser } from "../../services/api"; // ✅ Importar la función real

interface Field {
name: string;
type: string;
placeholder: string;
}

interface Props {
title: string;
fields?: Field[];
}

export const FormLogin: React.FC<Props> = ({ title, fields = [] }) => {
const navigate = useNavigate();

  // Estado del formulario
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

  // Manejar cambios de los inputs
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

  // Enviar datos al backend
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validar que todos los campos estén llenos
    const emptyFields = fields.some((field) => !formData[field.name]);
    if (emptyFields) {
    setError("Por favor completa todos los campos.");
    setLoading(false);
    return;
    }

    try {
      // Petición a la API
    const response = await loginUser(formData);

      // Guardar usuario en localStorage (esto funciona en el navegador)
    localStorage.setItem("user", JSON.stringify(response.data));

      // Redirigir al formulario de encuesta
    navigate("/survey");
    } catch (err: any) {
    setError(
        err.response?.data?.message || 
        "Credenciales incorrectas o usuario no encontrado."
);
    } finally {
    setLoading(false);
    }
};

return (
    <div className="w-full max-w-sm md:max-w-md flex flex-col gap-4">
    <h2 className="font-semibold text-3xl mb-4">{title}</h2>

      {/* FORMULARIO */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field) => (
        <InputForm
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            onChange={handleChange}
        />
        ))}

        {/* Mensaje de error */}
        {error && (
        <p className="text-red-500 text-sm text-center mt-1">{error}</p>
        )}

        {/* Botón de envío */}
        <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 p-2 border border-orange-300 rounded-lg text-white font-bold shadow w-full cursor-pointer hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
        {loading ? "Cargando..." : title}
        </button>
    </form>

      {/* Enlace de olvido de contraseña */}
    <p className="text-gray-400 text-md mt-1 cursor-pointer hover:underline text-center">
        Olvidé mi contraseña
    </p>

      {/* Separador */}
    <p className="text-gray-400 font-semibold text-lg mt-3 text-center">
        o continúa con
    </p>

      {/* Íconos sociales */}
    <div className="flex gap-5 items-center justify-center mt-2">
        {imagesSocial.map((socialimage) => (
        <img
            key={socialimage.name}
            className="cursor-pointer w-10 h-auto"
            src={socialimage.img}
            alt={socialimage.name}
        />
        ))}
    </div>
    </div>
);
};