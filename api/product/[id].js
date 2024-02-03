import products from '../dataset/products.json';
import categories from '../dataset/categories.json';

export default async function handler(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { searchParams } = url;
  const hasId = searchParams.has('id');
  const filteredProduct = products.find((p) => p.id === searchParams.get('id'));
  filteredProduct.images = filteredProduct.images.split(',');
  filteredProduct.category = categories.find((c) => c.id === filteredProduct.category_id);
  if (hasId) return response.status(200).json(filteredProduct);
  return response.status(404).json({});
}
