// type defs
import user from "../Modules/User/Controllers/user";
import { IConnectedUser } from "../utils/CommonTypes";

const connectedUsers: Array<IConnectedUser> = [];

// adds socket id to users array
export const addUser = ({userId, socketId}: IConnectedUser) => {
    if (!connectedUsers.some((connectedUser: IConnectedUser): boolean => connectedUser.userId === userId)) {
        connectedUsers.push({userId, socketId});
    }
}

// removes user by matching socketId
export const removeUser = (clientSocketId: string) => {
    if (clientSocketId) {
        const index: number = connectedUsers.findIndex(({socketId}: IConnectedUser): boolean => socketId === clientSocketId);
        if (index !== -1) {
            connectedUsers.splice(index, 1);
        }
    }
}

// gets All users
export const getUsers = () => connectedUsers;

export const getUserById = (userId: string): IConnectedUser | undefined => {
    const users = getUsers();
    return users.find((user: IConnectedUser): boolean => user.userId === userId)
}
