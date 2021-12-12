import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CourseDateComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CourseDateComponent,
      multi: true
    }
  ]
})
export class CourseDateComponent implements ControlValueAccessor, Validator {
  public creationDate: string;
  public onChange = (_date: string): void => {};
  public onTouched = (): void => {};
  public isInvalid: boolean;

  constructor() { }

  setDate(): void {
    this.onChange(this.creationDate);
  }

  writeValue(date: string): void {
    this.creationDate = date;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl) : ValidationErrors | null {
    const regexp = RegExp(/^[0-1]{1}[0-9]{1}\/[0-3]{1}[0-9]{1}\/[1-2]{1}[0-9]{3}$/);
    if (!control.value || !control.value.match(regexp) ) {
      this.isInvalid = true;
      return { 'dateInvalid': true };
    }
    this.isInvalid = false;
    return null;
  }
}
