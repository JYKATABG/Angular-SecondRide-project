import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { matchPasswordsValidator } from './match-passwords-validator';

@Directive({
  selector: '[appMatchPasswords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordsDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordsDirective implements Validator, OnChanges {
  @Input() appMatchPasswords: string = '';

  validator: ValidatorFn = () => null;

  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentPasswordChanges = changes['appMatchPasswords'];
    if (currentPasswordChanges) {
      this.validator = matchPasswordsValidator(this.appMatchPasswords);
    }
  }
}
