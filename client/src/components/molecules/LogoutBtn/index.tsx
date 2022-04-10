// Top level imports
import { ReactElement } from "react";

//  atoms/molecules/organisms
import Icon from "../../atoms/Icon";

// props type definition
interface IProps {
    onClicked: () => void;
};

// Component definition
const LogoutBtn = ({ onClicked }: IProps): ReactElement => {
    return (
        <div className="cursor-pointer video_cam d-inline-block" title="Logout" onClick={onClicked}>
            <Icon iconKey="cog" />
        </div>
    )
}

export default LogoutBtn;
