import categories from '../dataset/categories.json';

export default async function handler(request, response) {
  return response.status(200).json(categories);
}
