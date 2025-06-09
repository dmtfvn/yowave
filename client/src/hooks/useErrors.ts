import { useState } from 'react';

import { ValidationError, ValidationErrorDetails } from '../interfaces/ValidationErrorInterface';

export default function useErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const errorsHandler = (error: Error | ValidationError) => {
    if ((error as ValidationError).name === 'ValidationError') {
      const accErrors = (error as ValidationError).inner.reduce(
        (acc: Record<string, string>, err: ValidationErrorDetails) => {
          acc[err.path] = err.message;

          return acc;
        },
        {}
      );

      setErrors(accErrors);
    } else {
      setErrors({ general: error.message });
    }
  }

  return {
    errors,
    errorsHandler,
  };
}
