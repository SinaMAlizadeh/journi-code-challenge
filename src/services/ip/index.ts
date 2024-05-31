import axios from 'axios';

import { IP_FINDER_BASE_API_URL } from '@/constant/env';
import { IpInformation } from '@/models/ip';

export const getIpInformation = async () => {
  const { data }: { data: IpInformation } = await axios.get(
    IP_FINDER_BASE_API_URL || ''
  );
  return data;
};
