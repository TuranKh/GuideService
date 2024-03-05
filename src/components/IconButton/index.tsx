import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./IconButton.scss";

export const IconButton = function ({
    children,
    ...buttonDefaultProps
}: {
    children: React.ReactElement;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const className = `icon-button ${buttonDefaultProps.className}`;
    return (
        <button {...buttonDefaultProps} className={className}>
            {children}
        </button>
    );
};
