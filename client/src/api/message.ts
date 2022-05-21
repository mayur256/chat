import { fetchWrapper } from "../utilities/fetchWrapper"
import { IResponse, MessageType } from "../components/types";

interface IMsgResponse extends IResponse {
    data: MessageType[]
}
export const getMessages = (threadId: string): Promise<IMsgResponse> => {
    return new Promise((resolve) => {
        (async () => {
            const response = await fetchWrapper(
                `/messages/${threadId}`,
                'GET',
                null,
            )

            resolve(response.json());
        })();
    })
}