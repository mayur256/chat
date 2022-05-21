// Models
import User, {IUserModel} from "../Modules/User/Models/User";

class UserManager {
    getUsers = async (loggedInUserId: string): Promise<Partial<IUserModel> | unknown> => {
        let result;

        try {
            result = await User.find({_id: {$ne: loggedInUserId}}).
                select({
                    name: 1,
                    email: 1,
                    avatar: 1,
                    online: 1
                })
        } catch (ex) {
            console.log(`Exception in UserManager.getUsers :: ${ex}`);
        }
        return result;
    }
};

export default new UserManager();
