// top level imports
import { ReactElement } from "react";

// Atoms / Molecules
import Avatar from "../../atoms/Avatar";
import UserInfo from "../../atoms/UserInfo";
import CallIcons from "../../molecules/CallIcons";
import Icon from "../../atoms/Icon";

// types import
import { ContactThreadType, GroupType } from "../../types";

// Props type definition
interface IProps {
    selectedContact: ContactThreadType | GroupType;
    messagesLength: number;
}

// Component definition
const Header = ({
    selectedContact,
    messagesLength
}: IProps): ReactElement => {
    // Props destructuring to get data
    const { name, avatar, online } = selectedContact;

    return (
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">

                <Avatar
                    src={avatar ?? ''}
                    online={online}
                />

                <UserInfo
                    name={name}
                    count={messagesLength}
                />

                <CallIcons>
                    <Icon iconKey="video" />
                    <Icon iconKey="phone" />
                </CallIcons>

            </div>
        </div>
    )
}

export default Header;
