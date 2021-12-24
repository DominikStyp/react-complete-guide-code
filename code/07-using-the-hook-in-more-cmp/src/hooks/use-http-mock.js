import { useState, useCallback } from 'react';
import mockTasks from '../mocks/tasks.json';

const useHttpMock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Request config", requestConfig);
        console.log("Data fetched");
        resolve();
        },
      3000);
    });

    if(requestConfig.method === 'POST'){
      applyData(
          mockTasks.push({ text: requestConfig.body.text, name: `id_${(new Date()).getTime()}`})
      );
    } else {
      applyData(mockTasks);
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttpMock;
