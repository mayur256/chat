// Models
import User, {IUserModel} from "../Modules/User/Models/User";

class UserManager {
    /**
     * @description - fetches all users except logged in user
     * @param {string} loggedInUserId - User Id of auth user 
     * @returns {IUserModel | unknown} - user or null or undefined
     */
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

    /**
     * @description - alters user online status in database
     * @param {string} userId 
     * @returns {Promise<boolean>}
     */
    changeOnlineStatus = async (userId: string, onlineStatus: boolean): Promise<boolean> => {
        let result = false;
        try {
            await User.findByIdAndUpdate(userId, { online: onlineStatus });
            result = true;
        } catch (ex: any) {
            console.log(`Exception in UserManager.changeOnlineStatus :: ${ex}`);
        }

        return result;
    }
};

export default new UserManager();
