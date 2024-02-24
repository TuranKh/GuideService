import { Label } from "@radix-ui/react-label";
import { Flex, Input, InputProps } from "antd";
import "./CustomInput.scss";

export const CustomInput = function <T>(formDetails: InputDetails<T> & { value: T[keyof T] } & InputProps) {
    const { inputKey, label, type, value } = formDetails;
    return (
        <div className='input-wrapper'>
            <label>{label}</label>
            <Input {...formDetails} />
        </div>
    );
};

export type InputDetails<T> = {
    label: string;
    type: string;
    inputKey: keyof T;
};
