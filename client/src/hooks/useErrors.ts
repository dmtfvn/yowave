import { useState } from 'react';

import { ValidationErrorI } from '../interfaces/validation-error/ValidationErrorI';
import { ValidationErrorDetailsI } from '../interfaces/validation-error/ValidationErrorDetailsI';

export default function useErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const errorsHandler = (error: Error | ValidationErrorI): void => {
    if ((error as ValidationErrorI).name === 'ValidationError') {
      const accErrors = (error as ValidationErrorI).inner.reduce(
        (acc: Record<string, string>, err: ValidationErrorDetailsI) => {
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
