import type { ChangeEvent } from "react";

type Props = {
type: string;
placeholder: string;
name: string;
value?: string;
onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm = ({
placeholder,
name,
type,
value,
onChange,
}: Props) => {
return (
    <input
    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
);
};
