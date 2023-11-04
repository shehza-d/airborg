import axios from "axios";
import { getUrl } from "../helpers";
import { useEffect, useState } from "react";
import { ILink } from "../types";

export default function useFetchData() {
  const [data, setData] = useState<ILink[]>([]);
  const [classId, setClassId] = useState("b9");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = () => setToggleRefresh(!toggleRefresh);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${getUrl()}/api/v1/links/${classId}`);

        console.log("🚀 ~ file: useCheckLoginStatus.ts:29 ~ ~ data:", data);
        setData(data?.data);
      } catch (err) {
        console.log("🚀 ~ file: useFetchData.ts:19 ~ fetchLinks ~ err:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [classId, toggleRefresh]);

  return { classId, setClassId, data, refresh, isLoading };
}
