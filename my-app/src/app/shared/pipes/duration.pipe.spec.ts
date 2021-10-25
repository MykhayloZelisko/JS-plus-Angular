/* eslint-disable no-magic-numbers */
import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('transforms 35 to "35 min"', () => {
    expect(pipe.transform(35) ).toBe(
      '35 min'
    );
  });

  it('transforms 134 to "2 h 14 min"', () => {
    expect(pipe.transform(134) ).toBe(
      '2 h 14 min'
    );
  });

  it('transforms -134 to ""', () => {
    expect(pipe.transform(-134) ).toBe(
      ''
    );
  });
});
