/**
 * @app VuonDau
 * @author phutruongck
 */

export const retryHandler = (client: any) => {
  const retryConfig = {
    retry: 3,
    retryDelay: 3000,
  };

  /**
   * get current retry count
   * @param config - Error config
   * @returns retry count
   */
  const getCurrentRetryCount = (config: any) => {
    config.headers.retryCount = config.headers.retryCount || 0;

    return config.headers.retryCount;
  };

  /**
   * check condition retry call api
   * @param err - Error
   * @returns boolean
   */
  const shouldRetry = (err: any) => {
    const currentRetryCount = getCurrentRetryCount(err.config);

    return (
      !err.response &&
      err.code !== 'ECONNABORTED' &&
      currentRetryCount < retryConfig.retry
    );
  };

  /**
   * count retry api 3 times
   * @param config - Error config
   */
  const increaseRetryCount = (config: any) => {
    config.headers.retryCount += 1;
  };

  /**
   * count retry api 3 times
   * @param config - Error config
   * @returns Reject
   */
  const retry = (err: any) => {
    if (shouldRetry(err)) {
      increaseRetryCount(err.config);

      return new Promise((resolve) => {
        setTimeout(() => resolve(client(err.config)), retryConfig.retryDelay);
      });
    }

    return Promise.reject(err);
  };

  return retry;
};
