import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe('ValueObject UNit Test', () => {
  test('Should be equals', () => {
    const vo1 = new StringValueObject('test');
    const vo2 = new StringValueObject('test');

    expect(vo1.equals(vo2)).toBeTruthy();

    const co1 = new ComplexValueObject('teste', 1);
    const co2 = new ComplexValueObject('teste', 1);
    expect(co1.equals(co2)).toBeTruthy();
  });

  test('Should not be equals', () => {
    const vo1 = new StringValueObject('test');
    const vo2 = new StringValueObject('test2');

    expect(vo1.equals(vo2)).toBe(false);

    const co1 = new ComplexValueObject('teste', 1);
    const co2 = new ComplexValueObject('teste2', 1);
    expect(co1.equals(co2)).toBe(false);
  });

  test('Should be false if undefined', () => {
    const vo1 = new StringValueObject('test');
    const vo2 = undefined;

    expect(vo1.equals(vo2 as any)).toBe(false);

    const co1 = new ComplexValueObject('teste', 1);
    const co2 = null;
    expect(co1.equals(co2 as any)).toBe(false);
  });
});