import dayjs from "dayjs";
import toast from "react-hot-toast";

export type TNumberValidator = {
    input: number | null;
    field?: string;
    informUser?: boolean;
    length?: number | null;
    maxLength?: number | null;
    minLength?: number | null;
};

export interface DateValidatorOptions {
    type?: string;
    informUser?: boolean;
    minDate?: dayjs.ConfigType;
    maxDate?: dayjs.ConfigType;
    customErrorMessage?: string;
}

export abstract class Validator {
    public static isTypeValid(input: any, type: string, informUser: boolean = false, field?: string): boolean {
        if (type === "dayjs" && dayjs.isDayjs(input)) {
            return true;
        }

        const fieldMessage = field ? `"${field}" xanasını daxil edin` : "Xananı daxil edin";

        if (String(input).length === 0) {
            informUser && toast.error(fieldMessage);
            return false;
        }

        if (typeof input === type) {
            return true;
        }

        const message = field ? `"${field}" xanasının tipi düzgün deyil` : "Tipi düzgün deyil";
        informUser && toast.error(!input ? fieldMessage : message);
        return false;
    }
}

export class EmailValidator extends Validator {
    static validate(input: string, informUser = true): boolean {
        const isTypeValid = super.isTypeValid(input, "string", informUser, "Elektron ünvan");
        if (!isTypeValid) return false;

        if (input.length === 0 && informUser) {
            informUser && toast.error("Elektron ünvanı daxil edin");
            return false;
        }

        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.exec(input)) {
            informUser && toast.error("Elektron ünvanı düzgün daxil edin!");
            return false;
        }

        return true;
    }
}
