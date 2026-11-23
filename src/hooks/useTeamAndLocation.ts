import { useEffect, useState } from 'react';
import { TeamDesk } from '../data/team';
import { LocationImage } from '../data/location';
import {
  fetchCmsLocationPhotos,
  fetchCmsTeamMembers,
} from '../services/teamLocationContent';

/**
 * Editorial content can be managed in Payload, but the curated local data is
 * always the fallback so the About page never renders empty if CMS is offline.
 */
export function useCmsTeamMembers(): TeamDesk[] {
  const [members, setMembers] = useState<TeamDesk[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchCmsTeamMembers()
      .then((result) => {
        if (isMounted && result.length > 0) setMembers(result);
      })
      .catch(() => {
        // Local TEAM_DESKS remain in place.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return members;
}

export function useCmsLocationPhotos(): LocationImage[] {
  const [photos, setPhotos] = useState<LocationImage[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchCmsLocationPhotos()
      .then((result) => {
        if (isMounted) setPhotos(result);
      })
      .catch(() => {
        // Local LOCATION_IMAGES remain in place.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return photos;
}
