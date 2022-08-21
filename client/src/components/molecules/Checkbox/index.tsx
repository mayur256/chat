// Top level imports
import { ReactElement } from "react";

// Atoms/ Molecules 
import FormControl from "../FormControl";
import Input from "../../atoms/Input";
import Label from "../../atoms/Label";

// Props type definitions
interface IProps {
    dataTestId: string
}

// Component definition
const Checkbox = ({ dataTestId }: IProps): ReactElement => {
    return (
        <FormControl
            className="form-group form-check mb-4 form-control-lg"
            data-testid={dataTestId}
        >
            <Input
                type="checkbox"
                className="form-check-input checkbox-lg"
                id="remember"
                name="remember"
            />

            <Label
                htmlFor="remember"
                text="Remember me"
                className="form-check-label ml-2 text-body"
            />
        </FormControl>
    )
}

export default Checkbox;
