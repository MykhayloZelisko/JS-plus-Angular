import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { Course } from 'src/app/interfaces/course';
import { AppStoreState } from '../../app-store.state';

export const selectCourseList: MemoizedSelector<AppStoreState, Course[]> = createFeatureSelector('courseList');
