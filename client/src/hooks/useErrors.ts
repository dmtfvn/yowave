import { useState } from 'react';
import { ValidationError } from 'yup';

export default function useErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const errorsHandler = (
    error: unknown
  ) => {
    if (error instanceof ValidationError) {
      const accErrors = error.inner.reduce((acc, err) => {
        if (err.path !== undefined) {
          acc[err.path] = err.message;
        }

        return acc;
      }, {} as Record<string, string>);

      setErrors(accErrors);
    } else if (error instanceof Error) {
      setErrors({ general: error.message });
    } else {
      setErrors({ general: 'Unknown error occurred' });
    }
  }

  return {
    errors,
    setErrors,
    errorsHandler
  };
}
