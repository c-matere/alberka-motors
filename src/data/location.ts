export interface LocationImage {
  src: string;
  caption: string;
  alt?: string;
}

/**
 * Photos of the Mombasa showroom, inspection bay and yard.
 * Drop files into public/location/ and add entries here, for example:
 *   { src: '/location/showroom-front.jpg', caption: 'Main showroom entrance' }
 * The gallery is hidden until at least one image is added.
 */
export const LOCATION_IMAGES: LocationImage[] = [];
