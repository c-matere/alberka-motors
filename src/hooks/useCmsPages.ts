import { useState, useEffect } from 'react';
import { CmsPage, fetchAllCmsPages } from '../services/cmsContent';

export function useCmsPages() {
  const [pages, setPages] = useState<Record<string, CmsPage>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isFromCms, setIsFromCms] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPages() {
      try {
        const data = await fetchAllCmsPages();
        if (isMounted && Object.keys(data).length > 0) {
          setPages(data);
          setIsFromCms(true);
        }
      } catch {
        // Fallback to static components
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPages();

    return () => {
      isMounted = false;
    };
  }, []);

  return { pages, loading, isFromCms };
}
