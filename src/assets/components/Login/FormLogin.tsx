import { imagesSocial } from "../../data/imagesSocial";
import { InputForm } from "../MainContent/InputForm";

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
  return (
    <div className="w-full max-w-sm md:max-w-md flex flex-col gap-4">
      <h2 className="font-semibold text-3xl mb-4">{title}</h2>

      <div>
        {fields.map((field) => (
          <InputForm
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}

        <p className="text-gray-400 text-md mt-1 cursor-pointer hover:underline">
          Olvidé mi contraseña
        </p>
      </div>

      <button className="bg-orange-500 p-2 border border-orange-300 rounded-lg text-white font-bold shadow w-full cursor-pointer">
        {title}
      </button>

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
