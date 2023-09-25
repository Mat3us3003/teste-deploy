import { DatePipePipe } from './date.pipe';

describe('DataPipePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipePipe();
    expect(pipe).toBeTruthy();
  });
});
