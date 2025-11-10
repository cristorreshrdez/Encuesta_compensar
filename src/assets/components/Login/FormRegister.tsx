import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../MainContent/InputForm";
import { imagesSocial } from "../../data/imagesSocial";


interface Field {
name: string;
type: string;
placeholder: string;
}

interface Props {
title: string;
fields?: Field[];
}

export const FormRegister: React.FC<Props> = ({ title, fields = [] }) => {
const navigate = useNavigate();

const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
    const emptyFields = fields.some((field) => !formData[field.name]);
    if (emptyFields) {
    setError("Por favor completa todos los campos.");
    setLoading(false);
    return;
    }

    
    if (formData.password !== formData.confirmPassword) {
    setError("Las contraseñas no coinciden.");
    setLoading(false);
    return;
    }

    try {
    await registerUser(formData);

      navigate("/");
    
    } catch (err) {
    setError(
        "Error al registrar. Verifica los datos e inténtalo nuevamente."
    );
    } finally {
    setLoading(false);
    }
};

return (
    <div className="w-full max-w-sm md:max-w-md flex flex-col gap-4">
    <h2 className="font-semibold text-3xl mb-4">{title}</h2>

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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 p-2 border border-orange-300 rounded-lg text-white font-bold shadow w-full cursor-pointer hover:bg-orange-600 transition-all"
        >
        {loading ? "Registrando..." : title}
        </button>
    </form>

    <p className="text-gray-400 font-semibold text-lg mt-3 text-center">
        o regístrate con
    </p>

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
function registerUser(_formData: { [key: string]: string; }) {
    throw new Error("Function not implemented.");
}

