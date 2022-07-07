// Top level imports
import { ReactElement } from "react";

// Atoms/ Molecules 
import FormControl from "../FormControl";
import Input from "../../atoms/Input";
import Label from "../../atoms/Label";

// Component definition
const Checkbox = (): ReactElement => {
    return (
        <FormControl className="form-group form-check mb-4 form-control-lg">
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
