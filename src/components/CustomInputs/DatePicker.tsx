import { ExtendedInputDetails } from "@/components/FormBuilder";
import { DatePicker } from "antd";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import locale from "antd/es/date-picker/locale/az_AZ";
import { InputProps } from "antd/lib";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import "dayjs/locale/az";
import { useState } from "react";
import "./CustomInput.scss";

const dateFormat = "DD.MM.YYYY";

export const CustomDatePicker = function ({ inputDetails, disableFuture, disablePast, ...rest }: CustomDatePickerProps) {
    const [pickerStatus, setPickerStatus] = useState<InputProps["status"]>("");

    const dateValue = isDayjs(inputDetails.value) ? dayjs(inputDetails.value) : null;
    const isDateDisabled = function (date: Dayjs) {
        if (disableFuture) {
            return date > dayjs();
        }
        if (disablePast) {
            return date < dayjs();
        }

        return false;
    };

    return (
        <div className='input-wrapper'>
            <label>{inputDetails.label}</label>
            <DatePicker
                value={dateValue}
                onChange={(value: Dayjs | null) => inputDetails.onChange({ key: inputDetails.key, value: value })}
                locale={locale}
                disabledDate={isDateDisabled}
                format={dateFormat}
                onBlur={(event) => inputDetails.required && setPickerStatus(event.target.value ? "" : "error")}
                status={pickerStatus}
                {...rest}
            />
        </div>
    );
};

export type CustomDatePickerProps = {
    inputDetails: Omit<ExtendedInputDetails<Dayjs | null>, "type">;
    disableFuture?: boolean;
    disablePast?: boolean;
} & PickerProps<Dayjs>;
