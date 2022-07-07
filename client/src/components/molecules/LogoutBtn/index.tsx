// Top level imports
import { ComponentPropsWithoutRef, ReactElement } from "react";

//  atoms/molecules/organisms
import Icon from "../../atoms/Icon";

// props type definition
interface IProps extends ComponentPropsWithoutRef<"div"> {
    onClicked: () => void;
};

// Component definition
const LogoutBtn = ({ onClicked, ...rest }: IProps): ReactElement => {
    return (
        <div
            className="cursor-pointer video_cam d-inline-block"
            title="Logout"
            onClick={onClicked}
            {...rest}
        >
            <Icon iconKey="cog" />
        </div>
    )
}

export default LogoutBtn;
