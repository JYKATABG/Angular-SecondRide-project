import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../shared/validators/email.directive';
import { MatchPasswordsDirective } from './validators/match-passwords.directive';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  declarations: [EmailDirective, MatchPasswordsDirective, ElapsedTimePipe],
  imports: [CommonModule],
  exports: [EmailDirective, MatchPasswordsDirective, ElapsedTimePipe],
})
export class SharedModule {}
