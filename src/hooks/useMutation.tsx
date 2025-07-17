import { useState, useCallback } from 'react';

interface UseMutationOptions<T, K> {
  onSuccess?: (data: K) => void;
  onError?: (error: Error) => void;
}

export function useMutation<T, K>(
  mutationFn: (variables: T) => Promise<K>,
  options: UseMutationOptions<T, K> = {},
) {
  const { onSuccess, onError } = options;

  const [data, setData] = useState<K | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: T) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        setData(result);
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err) {
        const mutationError = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(mutationError);
        if (onError) {
          onError(mutationError);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError],
  );

  return { mutate, data, isLoading, error };
}
