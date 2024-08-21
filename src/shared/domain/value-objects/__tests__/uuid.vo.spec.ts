import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('Uuid Unit teste', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test('Shloud throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('Invalid')
    }).toThrow(new InvalidUuidError());

    expect(validateSpy).toHaveBeenCalled();
  });

  test('Should create a valid uuid', () => {
    const uuid = new Uuid();

    expect(uuid).toBeDefined();
    expect(uuid.id).toBeDefined();

    expect(validateSpy).toHaveBeenCalled();
  });
});