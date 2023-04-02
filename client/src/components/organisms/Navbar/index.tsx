// Top level imports
import { ChangeEvent, ReactElement, useState } from "react";

// React -router
import { useNavigate } from "react-router-dom";

// React-redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/types";
// redux-actions
import { ADD_GROUP } from "../../../store/reducers/groupSlice";

// Sweetalert
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Utilities
import { removeAuthUserFromStorage } from "../../../utilities/Common";
// types
import { ContactThreadType, GroupType } from "../../types";

// Atoms / Molecules / Organisms
import Icon from "../../atoms/Icon";
import { Select } from "../../atoms/Select";
import Dropdown from "../../molecules/DropDown";
import DropdownItem from "../../atoms/DropdownItem";

// Props type definition
interface IProps {
    users: ContactThreadType[]
}

// select wrapper type definition
interface SProps {
    userOptions: {key: string, label: string}[]
};

// Select wrapper component
function MySelect({ userOptions }: SProps): ReactElement {
    // state definitions
    const [value] = useState([])

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event)
    }

    // Main renderer
    return (
        <>
            <label htmlFor="exampleFormControlSelect2">Select users for the group</label>
            <Select
                value={value}
                name="group-users"
                options={userOptions}
                multiple
                onSelectChange={handleSelectChange}
            />
        </>
    )
}
// Component definition
const Navbar = ({ users }: IProps): ReactElement => {
    // constants

    // Sweetalert initialization
    const MySwal = withReactContent(Swal);

    // hooks
    const storeData = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    // Computed Properties
    const authUser = storeData.user;
    const userOptions = users.map((user) => ({ key: user._id, label: user.name }));

    /** Handler functions - starts */
    const logout = () => {
        dispatch({ type: 'CLEAR_CURRENT_USER' });
        removeAuthUserFromStorage();
        navigator('/login', { replace: true });
    }

    const onMenuItemClicked = (eventKey: string | undefined): void => {
        const eventHandlers: { [key: string]: () => void } = {
            'logout': () => logout(),
            'create-room': () => onCreateRoomClicked()
        };

        eventHandlers[eventKey ?? '']?.();
    }

    const onCreateRoomClicked = () => {
        MySwal.fire({
            title: 'Create Room',
            html: (
                <form>
                    <div className="mb-3 text-left">
                        <label htmlFor="group-name" className="form-label">Group Name</label>
                        <input type="text" className="form-control" id="group-name" />
                    </div>

                    <div className="mb-2 form-group text-left">
                        <MySelect
                            userOptions={userOptions}
                        />
                    </div>

                </form>
            ),
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            showCloseButton: true
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                const groupName = (document.getElementById('group-name') as HTMLInputElement)?.value;
                
                if (groupName) {
                    const group: GroupType = {
                        _id: new Date().getTime().toString(36),
                        name: groupName,
                        messages: [],
                        members: [],
                        created_by: authUser._id
                    }
                    dispatch(ADD_GROUP(group));
                }
            }
        });
    }

    /**Handler function - ends  */

    // Main JSX
    return (
        <nav className="navbar navbar-light bg-primary d-flex">
            <span>Welcome <b>{authUser.name}!</b></span>

            <div id="action_menu">
                <Dropdown
                    triggerIconKey="cog"
                    triggerSize="lg"
                >
                    <DropdownItem eventKey="view-profile" onItemClicked={onMenuItemClicked}>
                        <Icon iconKey="user-circle" /> View profile
                    </DropdownItem>

                    <DropdownItem eventKey="create-room" onItemClicked={onMenuItemClicked}>
                        <Icon iconKey="plus" /> Create Room
                    </DropdownItem>

                    <DropdownItem eventKey="logout" onItemClicked={onMenuItemClicked}>
                        <Icon iconKey="arrow-left" /> Logout
                    </DropdownItem>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
