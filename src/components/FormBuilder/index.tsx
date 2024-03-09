import { CustomDatePicker } from "@/components/CustomInputs/DatePicker";
import { CustomSelectField } from "@/components/CustomInputs/SelectInput";
import { CustomTextField } from "@/components/CustomInputs/TextField";
import { EnumResponse } from "@/types";
import { InputProps } from "antd";
import dayjs, { Dayjs, isDayjs } from "dayjs";

export const FormBuilder = function ({ form }: { form: DynamicFormDetails & { inputs: Array<FormDetails> } & InputProps }) {
    return (
        <>
            {form.inputs.map((inputDetails) => {
                if (inputDetails.type === "text" || inputDetails.type === "number") {
                    return (
                        <CustomTextField
                            type={inputDetails.type}
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: form.values[inputDetails.key],
                            }}
                        />
                    );
                } else if (inputDetails.type === "select") {
                    return (
                        <CustomSelectField
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: form.values[inputDetails.key],
                                // @ts-ignore
                                options: form?.options?.[inputDetails.key],
                            }}
                        />
                    );
                } else if (inputDetails.type === "date") {
                    return (
                        <CustomDatePicker
                            key={inputDetails.key}
                            inputDetails={{
                                ...inputDetails,
                                onChange: form.onChange,
                                value: isDayjs(form.values[inputDetails.key]) ? dayjs(form.values[inputDetails.key] as Dayjs) : null,
                            }}
                        />
                    );
                }
            })}
        </>
    );
};

export type ExtendedInputDetails<T = any> = { value: T; onChange: (details: { key: string; value: T | null }) => void } & FormDetails;

export type CustomSelectProps = Omit<ExtendedInputDetails, "type"> & { options: Array<EnumResponse> };

export type FormDetails = {
    label?: string;
    defaultValue?: string | number | boolean;
    key: string;
    type: InputType;
    required?: boolean;
    disabled?: boolean;
    maxLength?: number;
    specificText?: string | null;
    isAdd?: boolean;
    props?: React.HTMLProps<HTMLDivElement>;
    isArray?: boolean;
};

export type DynamicFormDetails = {
    options: Record<string, Array<{ label: string; value: number | string }>>;
    values: Record<string, InputValue>;
    onChange: (details: InputChangeDetails) => void;
};

export type InputChangeDetails = {
    key: string;
    value: InputValue;
};
export type InputValue = string | number | null | Date | boolean | Dayjs;
export type InputType = "select" | "text" | "number" | "date";
