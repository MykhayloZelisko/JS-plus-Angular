export interface CourseData {
  title: string,
  creationDate: string,
  duration: number,
  description: string,
  authors?: string[]
}

export interface Course extends CourseData {
  id: number,
  topRated: boolean
}

export interface ConfigDeleteCourse {
  id: number,
  title: string,
  isVisible: boolean
}
