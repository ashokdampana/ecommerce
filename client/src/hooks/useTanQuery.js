import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

function useTanQuery(url, key, options = {}) {
  const fn = async () => {
    const res = await api.get(url);
    return res.data.data ?? res.data;
  };

  return useQuery({
    queryKey: key,
    queryFn: fn,
    staleTime: 60 * 1000, // 60 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

export default useTanQuery;