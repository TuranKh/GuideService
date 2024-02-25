import { ExtendedInputDetails } from "@/components/FormBuilder";
import { Input, InputProps, InputRef } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { InputProps as AntInputProps } from "antd/lib";
import { FC, RefAttributes, useState } from "react";
import "./CustomInput.scss";

type TextFieldProps = AntInputProps & RefAttributes<InputRef> & { inputDetails: ExtendedInputDetails };

export const CustomTextField: FC<TextFieldProps> = function ({ inputDetails, ...buildIndInputProps }) {
    const [inputStatus, setInputStatus] = useState<InputProps["status"]>("");

    const isNumberInput = inputDetails.type === "number";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue: valueType | undefined = e.target.value.trim();

        if (isNumberInput) {
            if (newValue === "0") {
                setInputStatus(""); // Clear input status
                inputDetails.onChange({ key: inputDetails.key, value: 0 });
                return;
            }

            if (!newValue || !isNaN(Number(newValue))) {
                newValue = newValue === "" ? undefined : Number(newValue);
            } else {
                return;
            }
        }

        setInputStatus(inputDetails.required && !newValue ? "error" : ""); // Update input status if required
        inputDetails.onChange({ key: inputDetails.key, value: newValue });
    };

    return (
        <div className='input-wrapper'>
            <label>{inputDetails.label}</label>
            <Input
                disabled={inputDetails.disabled}
                {...buildIndInputProps}
                status={inputStatus}
                onChange={handleInputChange}
                onBlur={() => setInputStatus(inputDetails.required && !inputDetails.value ? "error" : "")}
                maxLength={inputDetails.maxLength}
                value={inputDetails.value as valueType}
            />
        </div>
    );
};
