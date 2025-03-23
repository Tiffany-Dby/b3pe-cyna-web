import { Input } from "@/lib/components/ui/input";
import { Label } from "@radix-ui/react-label";
import * as React from "react";

type BaseInputGroupProps = React.ComponentProps<"input"> & {
  isSrOnly?: boolean;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  toggleType?: () => void;
};

const BaseInputGroup: React.FC<BaseInputGroupProps> = ({
  isSrOnly = false,
  label,
  icon: Icon,
  labelClassName = "",
  inputClassName = "",
  toggleType,
  type,
  autoComplete,
  placeholder,
  id,
  ...props
}) => {
  return (
    <div>
      {label && (
        <Label htmlFor={id} className={isSrOnly ? "sr-only" : labelClassName}>
          {label}
        </Label>
      )}
      <div className="relative w-full">
        <Input
          {...props}
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full aria-invalid:placeholder:text-danger ${inputClassName}`}
        />
        {Icon && (
          <Icon
            className={`size-5 absolute right-3 top-1/2 -translate-y-1/2 text-tertiary-75 ${
              toggleType && props.value ? "cursor-pointer" : ""
            }`}
            onClick={props.value ? toggleType : () => {}}
          />
        )}
      </div>
    </div>
  );
};

export default BaseInputGroup;
