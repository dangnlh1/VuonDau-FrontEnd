/**
 * @app VuonDau
 * @author phutruongck
 */

import {useKeycloak} from '@react-keycloak/web';
import axios, {AxiosInstance} from 'axios';
import {useEffect, useRef} from 'react';

export const useAxios = (baseURL: string) => {
  const axiosInstance = useRef<AxiosInstance>();
  const {keycloak, initialized} = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  useEffect(() => {
    axiosInstance.current = axios.create({
      baseURL,
      headers: {
        Authorization: initialized ? `Bearer ${kcToken}` : undefined,
      },
    });

    return () => {
      axiosInstance.current = undefined;
    };
  }, [baseURL, initialized, kcToken]);

  return axiosInstance;
};
