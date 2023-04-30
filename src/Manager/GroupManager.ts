// NPM modules

// Models
import Group from "../Modules/Group/Models/Group";

// type definitions
import { Group as IGroup } from "../utils/CommonTypes";

export default {
    // handles creation of a group
    createGroup: async (groupPayload: IGroup) => {
        try {
            return await Group.create(groupPayload);
        } catch (ex: any) {
            throw ex;
        }
    },

    // updates group details like its name ot members or admin
    updateGroup: async (groupPayload: IGroup) => {
        try {
            return await Group.
                findOneAndUpdate(
                    { _id: groupPayload._id },
                    groupPayload,
                    { new: true }
                );
        } catch (ex: any) {
            throw ex;
        }
    }
};
