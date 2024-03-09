import { CustomSelectProps } from "@/components/FormBuilder";
import { Select, SelectProps } from "antd";
import { InputProps } from "antd/lib";
import { useState } from "react";
import "./CustomInput.scss";

const { Option } = Select;

export const CustomSelectField = function ({ inputDetails, ...rest }: CustomSelectFieldProps) {
    const [selectStatus, setSelectStatus] = useState<InputProps["status"]>("");

    return (
        <div className='input-wrapper'>
            <label>{inputDetails.label}</label>
            <Select
                aria-required={inputDetails.required}
                value={inputDetails.value}
                onChange={(value) => {
                    inputDetails.onChange({ key: inputDetails.key, value });
                }}
                size='large'
                className='select-input'
                disabled={inputDetails.disabled}
                onBlur={() => inputDetails.required && setSelectStatus(inputDetails.value ? "" : "error")}
                status={selectStatus}
                allowClear={true}
                {...rest}
            >
                {inputDetails?.options?.map((option) => (
                    <Option key={option.id} value={option.value}>
                        {option.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export type CustomSelectFieldProps = {
    inputDetails: CustomSelectProps;
} & SelectProps;
