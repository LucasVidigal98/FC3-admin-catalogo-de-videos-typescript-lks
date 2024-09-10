import { Entity } from "../../../../domain/entity";
import { ValueObject } from "../../../../domain/value-object";
import { Uuid } from "../../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
}

class StubEntity extends Entity {
  entity_id!: Uuid;
  name!: string;
  price!: number;

  constructor(porps: StubEntityConstructor) {
    super();
    this.entity_id = porps.entity_id || new Uuid();
    this.name = porps.name;
    this.price = porps.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id,
      name: this.name,
      price: this.price
    }
  }

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('inMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it('Should insert new entity', async () => {
    const entity = new StubEntity({
      name: 'Teste',
      price: 100,
      entity_id: new Uuid()
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
  });

  it('Should bulk insert entities', async () => {
    const entity1 = new StubEntity({
      name: 'Teste',
      price: 100,
      entity_id: new Uuid()
    });

    const entity2 = new StubEntity({
      name: 'Teste',
      price: 100,
      entity_id: new Uuid()
    });

    await repo.bulkInsert([entity1, entity2]);

    expect(repo.items.length).toBe(2);
  });
});