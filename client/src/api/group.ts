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