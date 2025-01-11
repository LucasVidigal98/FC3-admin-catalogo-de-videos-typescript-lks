import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { Category } from "../../../../domain/category.entity";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe('CategorySequelizeRepository implemenatation', () => {
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it('should insert a new category', async () => {
    const category = Category.fake().aCategory().build();

    await repository.insert(category);

    const model = await CategoryModel.findByPk(category.category_id.id);

    expect(model).toBeDefined();
    expect(model?.toJSON()).toMatchObject({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
    });
  });
});