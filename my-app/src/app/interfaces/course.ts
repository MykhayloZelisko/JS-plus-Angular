export interface CourseData {
  title: string,
  creationDate: string,
  duration: number,
  description: string,
  topRated: boolean
}

export interface Course extends CourseData {
  id: number
}

export interface ConfigDeleteCourse {
  id: number,
  title: string,
  isVisible: boolean
}
