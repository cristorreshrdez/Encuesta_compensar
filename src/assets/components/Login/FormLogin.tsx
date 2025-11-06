import type { ChangeEvent, FormEvent } from "react";
import { imagesSocial } from "../../data/imagesSocial";
import { InputForm } from "../MainContent/InputForm";

interface Field {
name: string;
type: string;
placeholder: string;
value: string;
onChange: (e: ChangeEvent<HTMLInputElement>) => void;
error?: string;
}

interface Props {
title: string;
fields: Field[];
loading?: boolean;
apiError?: string | null;
onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormLogin: React.FC<Props> = ({
title,
fields = [],
loading,
apiError,
onSubmit,
}) => {
return (
    <div className="w-full max-w-sm md:max-w-md flex flex-col gap-4">
    <h2 className="font-semibold text-3xl mb-4">{title}</h2>

    { }
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
        {fields.map((field) => (
            <div key={field.name} className="mb-2">
            <InputForm
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
            />
            {field.error && (
                <p className="text-xs text-red-500 mt-1">{field.error}</p>
            )}
            </div>
        ))}

        <p className="text-gray-400 text-md mt-1 cursor-pointer hover:underline">
            Olvidé mi contraseña
        </p>
        </div>

        {apiError && <p className="text-xs text-red-500 mt-1">{apiError}</p>}

        <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 p-2 border border-orange-300 rounded-lg text-white font-bold shadow w-full cursor-pointer disabled:opacity-60"
        >
        {loading
            ? title.toLowerCase().includes("iniciar")
            ? "Iniciando sesión..."
            : "Registrando..."
            : title}
        </button>
    </form>

    <p className="text-gray-400 font-semibold text-lg mt-3 text-center">
        o continúa con
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
