import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api.js";
import { toast } from "react-toastify";

function useTanMutation(method, url, key) {
  const queryClient = useQueryClient();

  const mutationFn = async ({ body, options = {} }) => {
    const res = await api({ method, url, data: body, ...options });
    return res.data.data ?? res.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: key ? [key] : undefined,
    onSuccess: (data) => {
      if (key) queryClient.invalidateQueries({ queryKey: [key] });
      toast.success(data?.message || "Success!");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(msg);
    },
  });
}

export default useTanMutation;
