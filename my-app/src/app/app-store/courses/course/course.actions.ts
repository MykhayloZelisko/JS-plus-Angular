/* eslint-disable no-unused-vars */
import { Course, CourseData } from 'src/app/interfaces/course';
import { CourseAction, CourseActionType } from './course.models';

export class DeleteCourse implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.deleteCourse;

  constructor(public id: number) {}
}

export class DeleteCourseSuccess implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.deleteCourseSuccess;

  constructor() {}
}

export class DeleteCourseFail implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.deleteCourseFail;

  constructor() {}
}

export class GetCourse implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.getCourse;

  constructor(public id: number) {}
}

export class GetCourseSuccess implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.getCourseSuccess;

  constructor(public course: Course) {}
}

export class GetCourseFail implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.getCourseFail;

  constructor() {}
}

export class UpdateCourse implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.updateCourse;

  constructor(public id: number, public data: CourseData) {}
}

export class UpdateCourseSuccess implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.updateCourseSuccess;

  constructor(public course: Course) {}
}

export class UpdateCourseFail implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.updateCourseFail;

  constructor() {}
}

export class CreateCourse implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.createCourse;

  constructor(public data: CourseData) {}
}

export class CreateCourseSuccess implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.createCourseSuccess;

  constructor(public course: Course) {}
}

export class CreateCourseFail implements CourseAction {
  public readonly type: CourseActionType = CourseActionType.createCourseFail;

  constructor() {}
}
