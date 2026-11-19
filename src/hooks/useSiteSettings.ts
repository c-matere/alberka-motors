import { useState, useEffect } from 'react';
import { CmsSiteSettings, fetchCmsSiteSettings } from '../services/cmsContent';

const DEFAULT_SETTINGS: CmsSiteSettings = {
  businessName: 'Alberka Enterprises Limited',
  tagline: 'Direct Japanese Imports · Mombasa Showroom & Yard',
  foundedYear: '2000',
  footerNotice: '© 2026 Alberka Enterprises Limited. Direct Japanese Import Specialists. Mombasa, Kenya.',
  phone: '+254 180 423 075',
  whatsappNumber: '254180423075',
  email: 'yard@alberka.co.ke',
  workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
  mombasaYardAddress: 'Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa, Kenya',
  nairobiShowroomAddress: 'Mombasa Showroom & Yard (Sole Office)',
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
