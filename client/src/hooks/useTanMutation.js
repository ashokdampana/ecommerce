import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api"
import { toast } from 'react-toastify'

function useTanMutation (method, url, key) {
    const queryClient = useQueryClient();

    const mutationFn = async ({ body, options={}}) => {
        const res = await api({method, url, data: body, ...options }) 
        return res.data;
    }
    return useMutation({
        mutationFn,
        mutationKey: key,
        onSuccess: (data) => {
            if(key) queryClient.invalidateQueries(key);
            toast.success(data?.message || "Success!");
        },
        onError: (err) => {
            const msg = err?.response?.data?.message || "Something went wrong";
            toast.error(msg);
        }
    })
}

export default useTanMutation;
