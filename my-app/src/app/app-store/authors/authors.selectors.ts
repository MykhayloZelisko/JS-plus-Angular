import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { CourseAuthor } from 'src/app/interfaces/course';
import { AppStoreState } from '../app-store.state';

export const selectAuthorsList: MemoizedSelector<AppStoreState, CourseAuthor[]> = createFeatureSelector('authorsList');
