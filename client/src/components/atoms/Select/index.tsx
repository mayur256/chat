// top level imports
import { ChangeEvent, ReactElement } from "react";

// types
import { SelectOption } from "../../types";

// props type definitions
interface IProps {
    name: string;
    options: Array<SelectOption>,
    multiple?: boolean
    value?: string | Array<string>;
    onSelectChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

// Component definition
export function Select({
    name,
    options,
    multiple = false,
    value = '',
    onSelectChange = () => {}
}: IProps): ReactElement {
    const selectVal = !value && multiple ? [] : value;

    // Main renderer
    return (
        <select
            name={name}
            size={2}
            className="form-control"
            multiple={multiple}
            aria-label="multiple select example"
            value={selectVal}
            onChange={onSelectChange}
        >
            {options.map(({ value, label }: SelectOption): ReactElement => (
                <option key={value} value={value}>{label}</option>
            ))}
        </select>
    )
}
