import { MillisecondsToTimePipe } from './milliseconds-to-time.pipe';

describe('MillisecondsToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MillisecondsToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
