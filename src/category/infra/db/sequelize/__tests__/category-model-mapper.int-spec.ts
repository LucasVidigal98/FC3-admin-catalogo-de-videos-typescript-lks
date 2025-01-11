import { Sequelize } from "sequelize-typescript";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { CategoryModel } from "../category.model";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe('CategoryModelMapper implementation', () => {
  let repository: CategorySequelizeRepository;

  setupSequelize();

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it('Test', () => {
    expect(true).toBe(true)
  })
})