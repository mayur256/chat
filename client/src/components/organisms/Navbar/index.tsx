// Top level imports
import { ReactElement } from "react";

// React -router
import { useNavigate } from "react-router-dom";

// React-redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/types";

// Utilities
import { removeAuthUserFromStorage } from "../../../utilities/Common";

// Atoms / Molecules / Organisms
import Icon from "../../atoms/Icon";
// import Button from "../../atoms/Button";
import Dropdown from "../../molecules/DropDown";
import DropdownItem from "../../atoms/DropdownItem";

// Component definition
const Navbar = (): ReactElement => {
    // hooks
    const authUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    /** Handler functions - starts */
    const logout = () => {
        dispatch({ type: 'CLEAR_CURRENT_USER' });
        removeAuthUserFromStorage();
        navigator('/login', { replace: true });
    }

    const onMenuItemClicked = (eventKey: string | undefined): void => {

        if (eventKey === 'logout') {
            logout();
        }
    }
    /**Handler function - ends  */

    // Main JSX
    return (
        <nav className="navbar navbar-light bg-primary">
            <span>Welcome <b>{ authUser.name }!</b></span>
            
            <div id="action_menu">
                <Dropdown
                    triggerIconKey="cog"
                    triggerSize="lg"
                >
                    <DropdownItem eventKey="view-profile" onItemClicked={onMenuItemClicked}>
                        <Icon iconKey="user-circle" /> View profile
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
