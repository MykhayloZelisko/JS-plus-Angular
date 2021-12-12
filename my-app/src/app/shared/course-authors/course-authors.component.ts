import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorsService } from 'src/app/app-store/authors/authors.service';
import { CourseAuthor } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-authors',
  templateUrl: './course-authors.component.html',
  styleUrls: ['./course-authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CourseAuthorsComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CourseAuthorsComponent,
      multi: true
    }
  ]
})
export class CourseAuthorsComponent implements ControlValueAccessor, Validator {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public authorCtrl = new FormControl();
  public filteredAuthors: Observable<CourseAuthor[]>;
  public authors: CourseAuthor[] = [];
  public allAuthors: CourseAuthor[];

  public onChange = (_authors: CourseAuthor[] ): void => {};
  public onTouched = (): void => {};
  public isInvalid: boolean;

  @ViewChild('authorInput') authorInput: ElementRef<HTMLInputElement>;

  constructor(private _authorsService: AuthorsService) {
    this.filteredAuthors = this.authorCtrl.valueChanges.pipe(
      // startWith(null),
      map( (author: CourseAuthor) => (author.name ? this._filter(author.name) : this.allAuthors.slice() ) ),
    );

    this._authorsService.getAuthors('').subscribe(
      (authors: CourseAuthor[] ) => {
        this.allAuthors = authors;
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const author = this.allAuthors.find( (author: CourseAuthor) => author.name === value);
      this.authors.push(author);
    }

    event.chipInput?.clear();

    this.authorCtrl.setValue(null);
  }

  remove(author: CourseAuthor): void {
    const index = this.authors.indexOf(author);
    if (index >= 0) {
      this.authors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const author = this.allAuthors.find( (author: CourseAuthor) => author.name === event.option.viewValue);
    this.authors.push(author);
    this.authorInput.nativeElement.value = '';
  }

  private _filter(value: string): CourseAuthor[] {
    const filterValue = value.toLowerCase();

    return this.allAuthors.filter(author => author.name.toLowerCase().includes(filterValue) );
  }

  setAuthors(): void {
    this.onChange(this.authors);
  }

  writeValue(authors: CourseAuthor[] ): void {
    this.authors = authors;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate() : ValidationErrors | null {
    return null;
  }
}
