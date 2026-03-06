import { useParams, useRouteLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import fetchCategoryData from "~/_utils/fetchCategoryData";
import { DEFAULT_SUB_BLOG } from "~/constants/supabase";
import useCategoryStore from "~/stores/category";

export default function useFetchCategory() {
  const params = useParams();
  const { supabaseCredential } = useRouteLoaderData("root");
  const { setCategory } = useCategoryStore();

  const subBlogId = params.subBlogId ?? DEFAULT_SUB_BLOG;

  const supabase = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: fetchedCategoryList = [], isLoading } = useQuery({
    queryKey: ["categories", subBlogId],
    queryFn: () => fetchCategoryData({ supabaseClient: supabase, subBlogId }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (fetchedCategoryList.length > 0) {
      setCategory(fetchedCategoryList);
    }
  }, [fetchedCategoryList, setCategory]);

  return { isLoading };
}
