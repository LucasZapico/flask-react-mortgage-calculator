import { useEffect, useState } from 'react';

import axios from 'axios';

export const useAxios = (url, options) => {
  const [response, setResponse] = useState(null);
  useEffect(async () => {
    const res = await axios();
  });
};
