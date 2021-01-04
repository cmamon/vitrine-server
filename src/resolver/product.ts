/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Arg,
  Mutation,
} from 'type-graphql';
import Product from '../entity/Product';

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return Product.find();
  }

  @Query(() => Product, { nullable: true })
  async product(@Arg('id') id: number): Promise<Product | null> {
    return Product.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('name') name: string,
    @Arg('description') description: string
  ): Promise<Product> {
    return Product.create({ name, description }).save();
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id') id: number,
    @Arg('name', () => String, { nullable: true }) name: string,
    @Arg('description', () => String, { nullable: true }) description: string,
  ): Promise<Product> {
    const product = await Product.findOne(id);

    if (!product) {
      return null;
    }

    if (typeof name !== 'undefined') {
      await Product.update({ id }, { name, description });
    }

    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Arg('id') id: number): Promise<Product | null> {
    const product = await Product.findOne(id);

    if (!product) {
      return null;
    }

    return Product.remove(product);
  }
}
