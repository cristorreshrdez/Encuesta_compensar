import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../assets/components/MainContent/InputForm";
import { surveyData } from "../assets/data/surveyData";


export const Survey = () => {
const navigate = useNavigate();

  // 🔐 Verificación de login
useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/"); // redirige al login si no hay usuario
    }
}, [navigate]);

  // 🧠 Estado para guardar respuestas
const [answers, setAnswers] = useState<{ [key: string]: string }>({});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

  // 📩 Manejar cambios en inputs
const handleChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
};

  // 🚀 Enviar encuesta al backend
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Verificar que todas las preguntas estén respondidas
    const unanswered = surveyData.some((q) => !answers[q.id]);
    if (unanswered) {
    setMessage("Por favor responde todas las preguntas antes de enviar.");
    setLoading(false);
    return;
    }

    try {
    await sendSurvey(answers);

    setMessage("✅ Encuesta enviada correctamente. ¡Gracias por participar!");
    setAnswers({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
    setMessage("❌ Error al enviar la encuesta. Intenta nuevamente.");
    } finally {
    setLoading(false);
    }
};

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg bg-white p-8 w-full max-w-md"
    >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Encuesta
        </h1>

        {/* Campo de fecha */}
        <InputForm
        type={"date"}
        placeholder={"Fecha"}
        name={"fecha"}
        onChange={(e) => handleChange("fecha", e.target.value)}
        />

        {/* Preguntas dinámicas */}
        <ul className="mt-4 space-y-6">
        {surveyData.map((item) => (
            <li key={item.id}>
            <h2 className="text-gray-700 font-semibold mb-2">
                {item.title}
            </h2>
            <div className="flex justify-between flex-wrap gap-2">
                {item.question.options.map((select) => (
                <label key={select.label} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name={item.id}
                    value={select.label}
                    checked={answers[item.id] === select.label}
                    onChange={(e) =>
                        handleChange(item.id, e.target.value)
                    }
                    />
                    <span>{select.label}</span>
                </label>
                ))}
            </div>
            </li>
        ))}
        </ul>

        {/* Mensaje de estado */}
        {message && (
        <p
            className={`mt-6 text-center text-sm ${
            message.includes("Error") ? "text-red-500" : "text-green-600"
            }`}
        >
            {message}
        </p>
        )}

        {/* Botón de envío */}
        <div className="flex justify-end mt-10 mb-6 pr-4">
        <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-3xl shadow-md transition cursor-pointer"
        >
            {loading ? "Enviando..." : "Enviar"}
        </button>
        </div>
    </form>
    </div>
);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sendSurvey(_answers: { [key: string]: string; }) {
    throw new Error("Function not implemented.");
}

