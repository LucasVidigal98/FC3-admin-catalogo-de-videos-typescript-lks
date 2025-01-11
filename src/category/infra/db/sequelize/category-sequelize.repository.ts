import { Op } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../domain/category.entity";
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from "../../../domain/category.repository";
import { CategoryModel } from "./category.model";
import { CategoryModelMapper } from "./category-model-mapper";

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(private categoryModel: typeof CategoryModel) {

  }

  async insert(entity: Category): Promise<void> {
    const model = CategoryModelMapper.toModel(entity);

    this.categoryModel.create(model.toJSON());
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    const models = entities.map((entity) => CategoryModelMapper.toModel(entity));

    await this.categoryModel.bulkCreate(models);
  }

  private async _get(id: string) {
    return this.categoryModel.findByPk(id);
  }

  async update(entity: Category): Promise<void> {
    const id = entity.category_id.id;

    const model = await this._get(id);

    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }

    const modelToUpdate = CategoryModelMapper.toModel(entity);

    await this.categoryModel.update(
      modelToUpdate.toJSON(),
      { where: { category_id: id } }
    );
  }

  async delete(enetity_id: Uuid): Promise<void> {
    const id = enetity_id.id;

    const model = await this._get(id);

    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }

    await model.destroy();
  }

  async findById(entity_id: Uuid): Promise<Category | null> {
    const model = await this._get(entity_id.id);

    return model ? CategoryModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();

    return models.map((model) => CategoryModelMapper.toEntity(model));
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` }
        }
      }),
      ...(props.sort && this.sortableFields.includes(props.sort) ? { order: [[props.sort, 'desc']] } : { order: [['created_at', 'desc']] }),
      offset,
      limit
    });

    return new CategorySearchResult({
      items: models.map((model) => new Category({
        category_id: new Uuid(model.category_id),
        name: model.name,
        created_at: model.createdAt,
        description: model.description,
        is_active: model.is_active
      })),
      current_page: props.page,
      per_page: props.per_page,
      total: count
    })
  }
}