// Top level imports
import { ReactElement, useRef, useState } from "react";

// React -router
import { useNavigate } from "react-router-dom";

// React-Select
import RSelect from "react-select";

// React-redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/types";
// redux-actions
import { ADD_GROUP } from "../../../store/reducers/groupSlice";

// Socket IO
import { Socket } from "socket.io-client";

// Sweetalert
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Utilities
import { removeAuthUserFromStorage } from "../../../utilities/Common";
// types
import {
    ContactThreadType,
    GroupType,
    SelectOption,
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../types";

// Atoms / Molecules / Organisms
import Icon from "../../atoms/Icon";

// import { Select } from "../../atoms/Select";
import Dropdown from "../../molecules/DropDown";
import DropdownItem from "../../atoms/DropdownItem";

// Props type definition
interface IProps {
    users: ContactThreadType[]
    socket?: Socket<ServerToClientEvents, ClientToServerEvents>
}

// select wrapper type definition
interface SProps {
    value: SelectOption[];
    onSelectChange: (newVal: any) => void;
    userOptions: SelectOption[];
};

// Select wrapper component
function MySelect({ userOptions, value, onSelectChange }: SProps): ReactElement {
    const [selectVal, setSelectVal] = useState<SelectOption[]>(value);

    const onChnageHandler = (newVal: any) => {
        setSelectVal(newVal)
        onSelectChange(newVal);
    }
    // Main renderer
    return (
        <>
            <label htmlFor="exampleFormControlSelect2">Select users for the group</label>
            <RSelect
                value={selectVal}
                onChange={onChnageHandler}
                options={userOptions}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                closeMenuOnScroll={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}            />
        </>
    )
}
// Component definition
const Navbar = ({ users, socket }: IProps): ReactElement => {

    // Sweetalert initialization
    const MySwal = withReactContent(Swal);

    // hooks
    const storeData = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    // refs
    const groupUsersRef = useRef<SelectOption[]>([]);

    // Computed Properties
    const authUser = storeData.user;
    const userOptions = users.map((user) => ({ value: user._id, label: user.name }));

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
            title: 'Create Group',
            html: (
                <form>
                    <div className="mb-3 text-left">
                        <label htmlFor="group-name" className="form-label">Group Name</label>
                        <input type="text" className="form-control" id="group-name" />
                    </div>

                    <div className="mb-2 form-group text-left">
                        <MySelect
                            value={groupUsersRef.current}
                            onSelectChange={handleSelectChange}
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
                        members: groupUsersRef.current.map(el => el.value),
                        created_by: authUser._id
                    }
                    dispatch(ADD_GROUP(group));
                    socket?.emit('join-room', { user: authUser._id, room: groupName });
                }
            }
        });
    }

    // MySelect change handler
    const handleSelectChange = (newVal: any): void => {
        groupUsersRef.current = newVal;
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
