// app/hooks/usePostDate.js
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const usePostData = (key, url) => {
  return useQuery(
    key,
    async () => {
      return await axios.get(url);
    },
    { refetchOnMount: false, refetchOnWindowFocus: true }
  );
};
