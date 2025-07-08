import { useState } from 'react';

import { ValidationErrorT } from '../types/validation-error/ValidationErrorT';
import { ValidationErrorDetailsT } from '../types/validation-error/ValidationErrorDetailsT';

export default function useErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const errorsHandler = (
    error: Error | ValidationErrorT
  ): void => {
    if ((error as ValidationErrorT).name === 'ValidationError') {
      const accErrors = (error as ValidationErrorT).inner.reduce(
        (acc: Record<string, string>, err: ValidationErrorDetailsT) => {
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
    setErrors,
    errorsHandler
  };
}
