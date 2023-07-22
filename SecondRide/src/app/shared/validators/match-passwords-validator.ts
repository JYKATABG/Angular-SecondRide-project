import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(password: string): ValidatorFn {
  return (control) => {
    return control.value === password
      ? null
      : { matchPasswordsValidator: true };
  };
}
