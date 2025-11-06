import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../assets/components/MainContent/InputForm";
import { surveyData } from "../assets/data/surveyData";
import { surveyApi } from "../services/api";

export const Survey = () => {
const navigate = useNavigate();

useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
    navigate("/login", { replace: true });
    }
}, [navigate]);

const [date, setDate] = useState<string>("");
const [answers, setAnswers] = useState<Record<string, string | null>>(() => {
    const initial: Record<string, string | null> = {};
    surveyData.forEach((q) => {
    initial[q.id] = null;
    });
    return initial;
});

const [errors, setErrors] = useState<{ date?: string; questions?: string }>(
    {}
);
const [apiError, setApiError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);

const handleChangeAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
};

const validate = () => {
    const newErrors: typeof errors = {};

    if (!date) {
    newErrors.date = "La fecha es obligatoria";
    }

    const allAnswered = surveyData.every((q) => !!answers[q.id]);
    if (!allAnswered) {
    newErrors.questions = "Debes responder todas las preguntas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    const user = sessionStorage.getItem("user") || "";

    const preguntasPartes = surveyData.map((q, index) => {
    const num = index + 1;
    const ans = answers[q.id];
    return `'Pregunta ${num}':'${ans}'`;
    });

    const surveyString =
    "{'fecha':'" + date + "'," + preguntasPartes.join(",") + "}";

    try {
    setLoading(true);
    await surveyApi(user, surveyString);
    setShowSuccessModal(true);
    } catch (err: any) {
    setApiError(err.message || "Error al enviar la encuesta");
    } finally {
    setLoading(false);
    }
};

const handleFinish = () => {
    setShowSuccessModal(false);
    navigate("/login");
};

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
    {}
    <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full max-w-md"
    >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Encuesta
        </h1>

        {}
        <div>
        <InputForm
            type={"date"}
            placeholder={"fecha"}
            name={"fecha"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && (
            <p className="text-xs text-red-500 mt-1">{errors.date}</p>
        )}
        </div>

        {}
        <ul className="mt-4 space-y-6">
        {surveyData.map((options, index) => (
            <li key={options.id}>
            <h2 className="text-gray-700 font-semibold mb-2">
                {options.title || `Pregunta ${index + 1}`}
            </h2>
            <div className="flex flex-wrap gap-3 justify-between">
                {options.question.options.map((select: any) => (
                <label key={select.label} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name={options.id}
                    value={select.label}
                    checked={answers[options.id] === select.label}
                    onChange={() =>
                        handleChangeAnswer(options.id, select.label)
                    }
                    />
                    <span>{select.label}</span>
                </label>
                ))}
            </div>
            </li>
        ))}
        </ul>

        {errors.questions && (
        <p className="text-xs text-red-500 mt-3">{errors.questions}</p>
        )}
        {apiError && <p className="text-xs text-red-500 mt-1">{apiError}</p>}

        {}
        <div className="flex justify-end mt-20 mb-10 pr-4 sm:pr-10">
        <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-3xl shadow-md transition cursor-pointer disabled:opacity-60"
        >
            {loading ? "Enviando..." : "Enviar"}
        </button>
        </div>
    </form>

    {}
    {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
        <div className="bg-white rounded-[24px] shadow-xl px-8 sm:px-10 py-8 w-full max-w-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <span className="text-green-500 text-2xl">✓</span>
            </div>

            <p className="text-base text-gray-900 font-medium mb-6">
            Tus respuestas se han guardado de manera correcta
            </p>

            <button
            onClick={handleFinish}
            className="mx-auto block rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-10 text-sm shadow-md"
            >
            Terminar
            </button>
        </div>
        </div>
    )}
    </div>
);
};
