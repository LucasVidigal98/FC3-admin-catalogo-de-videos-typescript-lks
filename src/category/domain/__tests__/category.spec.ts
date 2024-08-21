import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe('Category unit tests', () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  test('Should change name', () => {
    const category = Category.create({ name: 'movie' });

    category.changeName('movie x');
    expect(category.name).toBe('movie x');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('Should change description', () => {
    const category = Category.create({ name: 'movie', description: 'fool' });

    category.changeDescription('bail');
    expect(category.description).toBe('bail');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('Should activate', () => {
    const category = Category.create({ name: 'movie', description: 'fool', is_active: false });

    category.activate();
    expect(category.is_active).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('Should deactivate', () => {
    const category = Category.create({ name: 'movie', description: 'fool' });

    category.deactivate();
    expect(category.is_active).toEqual(false);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  describe('constructor', () => {
    test('Should be able to create a category', () => {
      const category = new Category({
        name: 'movie'
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBeNull();
      expect(category.activate).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('Create command', () => {
    test('Should create a category', () => {
      const category = Category.create({ name: 'movie' });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBeNull();
      expect(category.activate).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('category_id field', () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new Uuid() }];

    test.each(arrange)('id = %j', ({ id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: id as any
      });

      expect(category.category_id).toBeInstanceOf(Uuid);

      if (id instanceof Uuid) {
        expect(category.category_id).toBe(id);
      }
    });
  });
});

describe('Category Validator', () => {
  describe('create command', () => {
    test('Should an invalid category with name property', () => {
      expect(() => Category.create({ name: null as any })).containsErrorMessage({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });
  });
});