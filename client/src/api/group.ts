import { fetchWrapper } from "../utilities/fetchWrapper"
import { IResponse, GroupType } from "../components/types";

interface IGrpResponse extends IResponse {
    data: Partial<GroupType>
}

// Invokes an API to create group
export const createGroup = (group: GroupType): Promise<IGrpResponse> => {

    return new Promise((resolve: any) => {
        (async () => {
            const response = await fetchWrapper(
                '/group',
                'POST',
                null,
                group
            );

            resolve(response.json());
        })();
    })
}

interface IGroupsRes extends IResponse {
    data: GroupType[]
}
// Invokes API to fetch auth user groups
export const getUserGroups = (): Promise<IGroupsRes> => {

    return new Promise((resolve: any) => {
        (async () => {
            const response = await fetchWrapper(
                '/group',
                'GET',
                null,
            );

            resolve(response.json());
        })();
    })
}
