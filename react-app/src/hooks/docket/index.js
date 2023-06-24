import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_HOST_URL } from "../../config";
import { endpoints } from "../../config/endpoints";
import { fetchJson } from "../../libs/api";
import { getTokens } from "../../utils/shortcuts";
import { DOCKETS_QUERY_KEY } from "./query_keys";
import axios from "axios";



export function useDocketList() {
    const { isLoading, data } = useQuery([DOCKETS_QUERY_KEY], async () => {
        try {
            const { accessToken } = getTokens();
            const data = await fetchJson(`${API_HOST_URL}/${endpoints.docket.list}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            })
            return data;
        } catch (err) {
            return {
                success: false,
                detail: err
            };
        }
    }, {
        cacheTime: 0,
        staleTime: 1,
    })
    return { docketsData: data, docketsIsLoading: isLoading }
}



// Update Docket
export function useDocketUpdate() {
    const queryClient = useQueryClient();
    const mutation = useMutation(({ data, id }) => axios.patch(`${API_HOST_URL}/${endpoints.docket.list}/${id}`, data, {
        headers: {

        },
        onUploadProgress: (e) => {
            let percent = Math.round((100 * e.loaded) / e.total)
            console.log('Process: ', percent, e)
        },
    }), {
        retry: 2,
    })
    return {
        handleDocketAction: async (data, id) => {
            try {
                const res = await mutation.mutateAsync({ data, id });
                if (res.status === 200) {
                    await queryClient.invalidateQueries([DOCKETS_QUERY_KEY])
                }
                return res.data

            } catch (err) {
                return {
                    success: false,
                    detail: err
                }
            }
        },
        docketActionIsLoading: mutation.isLoading,
    }
}

