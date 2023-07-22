import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../shared/validators/email.directive';
import { MatchPasswordsDirective } from './validators/match-passwords.directive';

@NgModule({
  declarations: [EmailDirective, MatchPasswordsDirective],
  imports: [CommonModule],
  exports: [EmailDirective, MatchPasswordsDirective],
})
export class SharedModule {}
