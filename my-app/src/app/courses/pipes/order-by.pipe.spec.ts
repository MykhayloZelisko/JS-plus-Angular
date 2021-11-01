import { Course } from '../../interfaces/course';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();
  const list = [
    {
      id: 1,
      creationDate: '08/28/2022'
    },
    {
      id: 2,
      creationDate: '10/01/2021'
    },
    {
      id: 3,
      creationDate: '09/28/2021'
    },
    {
      id: 4,
      creationDate: '10/28/2021'
    },
    {
      id: 5,
      creationDate: '07/06/2020'
    },
    {
      id: 6,
      creationDate: '08/29/2020'
    },
    {
      id: 7,
      creationDate: '11/25/2021'
    },
    {
      id: 8,
      creationDate: '12/28/2021'
    }
  ] as Course[];
  const ascList = [
    {
      id: 5,
      creationDate: '07/06/2020'
    },
    {
      id: 6,
      creationDate: '08/29/2020'
    },
    {
      id: 3,
      creationDate: '09/28/2021'
    },
    {
      id: 2,
      creationDate: '10/01/2021'
    },
    {
      id: 4,
      creationDate: '10/28/2021'
    },
    {
      id: 7,
      creationDate: '11/25/2021'
    },
    {
      id: 8,
      creationDate: '12/28/2021'
    },
    {
      id: 1,
      creationDate: '08/28/2022'
    }
  ] as Course[];
  const descList = [...ascList].reverse();

  it('returns ascList', () => {
    expect(pipe.transform(list, 'creationDate', 'asc') ).toEqual(
      ascList
    );
  });

  it('returns descList', () => {
    expect(pipe.transform(list, 'creationDate', 'desc') ).toEqual(
      descList
    );
  });

});
