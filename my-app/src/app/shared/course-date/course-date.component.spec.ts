import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDateComponent } from './course-date.component';

describe('CourseDateComponent', () => {
  let component: CourseDateComponent;
  let fixture: ComponentFixture<CourseDateComponent>;
  const creationDateFieldMock = '11/07/2021';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDateComponent ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CourseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.creationDateField.nativeElement.value = creationDateFieldMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit date on component', () => {
    spyOn(component.setDateEvent, 'emit');
    component.setDate();
    expect(component.setDateEvent.emit).toHaveBeenCalledOnceWith(creationDateFieldMock);
  });
});
