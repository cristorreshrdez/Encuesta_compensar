interface Props {
    type: string;
    placeholder: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputForm: React.FC<Props> = ({
    placeholder,
    name,
    type,
    onChange,
    value,
}) => {
    return (    
        <input
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
}   