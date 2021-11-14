import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDateComponent } from './course-date.component';

describe('CourseDateComponent', () => {
  let component: CourseDateComponent;
  let fixture: ComponentFixture<CourseDateComponent>;
  const creationDateMock = '11/07/2021';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit date on component', () => {
    component.creationDate = creationDateMock;
    spyOn(component.setDateEvent, 'emit');
    component.setDate();
    expect(component.setDateEvent.emit).toHaveBeenCalledOnceWith(creationDateMock);
  });
});
