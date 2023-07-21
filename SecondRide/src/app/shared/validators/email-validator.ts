import { ValidatorFn } from '@angular/forms';

export function emailValidator(changes: string): ValidatorFn {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regExp = new RegExp(regex);

  return (control) => {
    return control.value === '' || regExp.test(control.value)
      ? null
      : { emailValidator: true };
  };
}
