import { ValidatorFn } from '@angular/forms';

export function dateValidator(year: string): ValidatorFn {
  return (control) => {
    // const group = control as FormGroup;
    // let inputYear = group.get(year);
    let toNumber = Number(control.value.createdDate.slice(0, 4));

    return toNumber <= 2023 ? null : { dateValidator: true };
  };
}
