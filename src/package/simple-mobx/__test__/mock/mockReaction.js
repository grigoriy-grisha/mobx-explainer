export class MockReaction {
  constructor() {
    this.run = jest.fn();
    this.dispose = jest.fn();
    this.track = jest.fn();
    this.addObserver = jest.fn();
    this.removeObserver = jest.fn();
    this.getDispose = jest.fn();
  }
}
