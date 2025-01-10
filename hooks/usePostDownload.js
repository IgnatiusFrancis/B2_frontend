import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const usePostDownload = (key, url) => {
  return useQuery(
    key,
    async () => {
      return await axios.post(url);
    },
    { refetchOnMount: false, refetchOnWindowFocus: true }
  );
};
