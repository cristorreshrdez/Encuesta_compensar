import { InputForm } from "../assets/components/MainContent/InputForm";
import { surveyData } from "../assets/data/surveyData";

export const Survey = () => {
return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    {}
    <div className="rounded-lg shadow-lg bg-white p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Encuesta
        </h1>

        {}
        <InputForm type={"date"} placeholder={"fecha"} name={"fecha"} />

        {}
        <ul className="mt-4 space-y-6">
        {surveyData.map((options) => (
            <li key={options.id}>
            <h2 className="text-gray-700 font-semibold mb-2">
                {options.title}
            </h2>
            <div className="flex justify-between">
                {options.question.options.map((select) => (
                <label key={select.label} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name={options.id}
                    value={select.label}
                    />
                    <span>{select.label}</span>
                </label>
                ))}
            </div>
            </li>
        ))}
        </ul>

        {}
        <div className="flex justify-end mt-20 mb-10 pr-10">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-3xl shadow-md transition cursor-pointer">
            Enviar
        </button>
        </div>
</div>
    </div>
);
};
