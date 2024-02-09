import products from '../dataset/products.json';
import categories from '../dataset/categories.json';
import * as _ from 'lodash';

export default async function handler(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { searchParams } = url;
  const hasTitle = searchParams.has('title');
  const hasCategoryId = searchParams.has('categoryId');
  const hasMinPrice = searchParams.has('price_min');
  const hasMaxPrice = searchParams.has('price_max');
  let chain = _.chain(products);
  chain = hasTitle
    ? chain.filter((p) => p.title.toLowerCase().includes(searchParams.get('title').toLowerCase()))
    : chain;
  chain = hasCategoryId ? chain.filter((p) => p.category_id === searchParams.get('categoryId')) : chain;
  chain = hasMinPrice ? chain.filter((p) => p.price >= parseInt(searchParams.get('price_min'))) : chain;
  chain = hasMaxPrice ? chain.filter((p) => p.price <= parseInt(searchParams.get('price_max'))) : chain;
  const total = chain.countBy().values().pop();
  const filteredProducts = chain.drop(searchParams.get('offset')).take(searchParams.get('limit'));
  return response.status(200).json({
    items: filteredProducts.map((p) => {
      const category = categories.find((c) => c.id === p.category_id);
      return {
        ...p,
        images: p.images.split(','),
        category,
      };
    }),
    total,
  });
}
