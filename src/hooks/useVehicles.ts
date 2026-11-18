import { useState, useEffect } from 'react';
import { VEHICLES, Vehicle } from '../data/vehicles';
import { fetchVehiclesFromPayload } from '../services/payloadApi';

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
  const [isCmsConnected, setIsCmsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const payloadVehicles = await fetchVehiclesFromPayload();
        if (isMounted && payloadVehicles && payloadVehicles.length > 0) {
          setVehicles(payloadVehicles);
          setIsCmsConnected(true);
        }
      } catch (err) {
        // Fallback to static verified SBT dataset
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { vehicles, isCmsConnected, loading };
}
