import { FormControl } from "@/lib/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Option } from "@/shared/types/Option";
import { useId } from "react";

type Props = {
  control: boolean;
  options: Option[];
  value: string;
  placeholder: string;
  name: string;
  onChange: () => void;
  disabled?: boolean;
};

const BaseSelect = ({
  control,
  options,
  placeholder,
  name,
  value,
  onChange,
  disabled,
}: Props) => {
  const id = useId();

  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      {control ? (
        <FormControl>
          <SelectTrigger
            className="w-full border-primary/40"
            id={name}
            name={name}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
      ) : (
        <SelectTrigger
          className="w-full border-primary/40"
          id={name}
          name={name}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={id + "-" + option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BaseSelect;
