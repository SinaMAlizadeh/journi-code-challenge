import '@/lib/env';

import { Countries } from '@/components/countries/countries';

import { Location } from '@/models/country';
import { getIpInformation } from '@/services/ip';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default async function HomePage() {
  const locationInfo = await getIpInformation();
  const latLng: Location = {
    lat: locationInfo.lat,
    lng: locationInfo.lon,
  };
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative w-1/2 flex min-h-screen flex-col items-center justify-start py-12 text-center'>
          <Countries latLng={latLng} />
        </div>
      </section>
    </main>
  );
}
