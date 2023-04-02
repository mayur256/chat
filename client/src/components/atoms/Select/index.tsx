// top level imports
import { ChangeEvent, ReactElement } from "react";

// props type definitions
type SelectOption = { key: string, label: string }
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
            size={2}
            className="form-control"
            multiple={multiple}
            aria-label="multiple select example"
            value={selectVal}
            onChange={onSelectChange}
        >
            {options.map(({ key, label }: SelectOption): ReactElement => (
                <option key={key} value={key}>{label}</option>
            ))}
        </select>
    )
}
