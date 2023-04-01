// top level imports
import { ReactElement } from "react";

// props type definitions
type SelectOption = { key: string, label: string }
interface IProps {
    options: Array<SelectOption>,
    multiple?: boolean
    value?: string;
    onSelectChange?: () => void
}

// Component definition
export function Select({
    options,
    multiple = false,
    value = '',
    onSelectChange = () => {}
}: IProps): ReactElement {
    return (
        <select
            size={2}
            value={value}
            onChange={onSelectChange}
            className="form-control"
            multiple={multiple}
            aria-label="multiple select example"
        >
            {options.map(({ key, label }: SelectOption): ReactElement => (
                <option key={key} value={key}>{label}</option>
            ))}
        </select>
    )
}
