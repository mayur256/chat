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
import Button from "../../atoms/Button";

// Component definition
const Navbar = (): ReactElement => {
    // hooks
    const authUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const logout = () => {
        dispatch({ type: 'CLEAR_CURRENT_USER' });
        removeAuthUserFromStorage();
        navigator('/login', { replace: true });
    }

    // Main JSX
    return (
        <nav className="navbar navbar-light bg-primary">
            <span>Welcome <b>{ authUser.name }!</b></span>
            <Button size="lg" title="logout" onClick={logout}>
                <Icon iconKey="cog" />
           </Button>
        </nav>
    );
};

export default Navbar;
