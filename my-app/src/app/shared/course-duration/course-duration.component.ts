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
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CourseDurationComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CourseDurationComponent,
      multi: true
    }
  ]
})
export class CourseDurationComponent implements ControlValueAccessor, Validator {
  public duration: number;
  public onChange = (_duration: number): void => {};
  public onTouched = (): void => {};
  public isInvalid: boolean;

  constructor() { }

  setDuration(): void {
    this.onChange(this.duration);
  }

  writeValue(duration: number): void {
    this.duration = duration;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  validate(control: AbstractControl) : ValidationErrors | null {
    const regexp = RegExp(/^[1-9]{1}[0-9]*$/);
    if (!control.value || !control.value.toString().match(regexp) ) {
      this.isInvalid = true;
      return { 'dateInvalid': true };
    }
    this.isInvalid = false;
    return null;
  }
}
