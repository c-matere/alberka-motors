import { useState, useEffect } from 'react';
import { CmsSiteSettings, fetchCmsSiteSettings } from '../services/cmsContent';

const DEFAULT_SETTINGS: CmsSiteSettings = {
  businessName: 'Alberka Motors',
  tagline: 'Direct Japanese Imports · Mombasa Port & Nairobi',
  foundedYear: '2000',
  footerNotice: '© 2026 Alberka Motors. Direct Japanese Import Specialists. Mombasa & Nairobi.',
  phone: '+254 714 333 888',
  whatsappNumber: '254714333888',
  email: 'yard@alberkamotors.co.ke',
  workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
  mombasaYardAddress: 'Tangana Road, Ganjoni, Port Reitz Area, Mombasa, Kenya',
  nairobiShowroomAddress: 'Alberka Plaza, Ngong Road, Nairobi, Kenya',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<CmsSiteSettings>(DEFAULT_SETTINGS);
  const [isFromCms, setIsFromCms] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const data = await fetchCmsSiteSettings();
        if (isMounted && data) {
          setSettings(data);
          setIsFromCms(true);
        }
      } catch {
        // Fallback to default brand settings
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return { settings, isFromCms };
}
