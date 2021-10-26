import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery).exec();
  }

  async paginatedFind(
    entityFilterQuery: FilterQuery<T>,
    page: number,
    limit: number,
    projection?: Record<string, unknown>,
    sortQuery?: FilterQuery<T>,
  ): Promise<T[] | null> {
    return await this.entityModel
      .find(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async create(createEntityData: any): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntityData, {
        new: true,
      })
      .exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel
      .deleteMany(entityFilterQuery)
      .exec();
    return deleteResult.deletedCount >= 1;
  }

  async count(): Promise<number> {
    return await this.entityModel.count().exec();
  }
}
