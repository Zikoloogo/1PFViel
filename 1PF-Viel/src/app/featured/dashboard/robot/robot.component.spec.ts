import { RobotComponent } from './robot.component';

describe('Test del Robot', () => {
  const robot = new RobotComponent();

  beforeEach(() => {
    robot.batery = 100;
  });

  it('Robot should create', () => {
    expect(robot.owner).toBe('Leon'); 
  });

  it('the robot should have full battery', () => {
    expect(robot.batery).toBe(100);
  });

  it('Robot should have functions', () => {
    expect(robot.functions.length).toBe(4);
    expect(robot.functions).toEqual(['wifi', 'sound', 'camera', 'light']);
  });

  it('the battery should be 90 after moving', () => {
    robot.move();
    expect(robot.batery).toBe(90);
  });

  it('robot should log battery error when battery is empty', () => {
    robot.batery = 0;
    const spyOnError = spyOn(console, 'error');
    robot.move();
    expect(spyOnError).toHaveBeenCalled();
    expect(spyOnError).toHaveBeenCalledWith('battery empty');
  });

  it('should call bateryError method when charging with full battery', () => {
    const spyOnError = spyOn(robot, 'bateryError');
    robot.batery = 100;
    robot.charge();
    expect(spyOnError).toHaveBeenCalledTimes(1);
  });
});
