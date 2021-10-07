import { Course } from '../interfaces/course';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();
  const list = [
    {
      id: 1,
      title: 'Video Course 1. Name tag'
    },
    {
      id: 2,
      title: 'Video Course 2. Name tag'
    },
    {
      id: 3,
      title: 'Video Course 3. Name tag'
    },
    {
      id: 4,
      title: 'Video Course 4. Name tag'
    },
    {
      id: 5,
      title: 'Video Course 5. Name tag'
    },
    {
      id: 6,
      title: 'Video Course 6. Name tag'
    },
    {
      id: 7,
      title: 'Video Course 7. Name tag'
    },
    {
      id: 8,
      title: 'Video Course 8. Name tag'
    }
  ] as Course[];

  it('should return list[7]', () => {
    expect(pipe.transform(list, 'coUrsE 8') ).toEqual(
      [list[7]]
    );
  });

  it('should return []', () => {
    expect(pipe.transform(list, 'coUrsE 9') ).toEqual(
      []
    );
  });

  it('should return list', () => {
    expect(pipe.transform(list, undefined) ).toEqual(
      list
    );
  });
});
