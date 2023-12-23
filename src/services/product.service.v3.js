const product = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const {
  findProduct,
  queryProduct,
  searchProductByText,
  findAllProducts,
} = require('../models/repositories/product.repo.v3');

class ProductService {
  static async searchProducts({ keySearch }) {
    keySearch = decodeURIComponent(keySearch);
    return await searchProductByText({
      keySearch,
      limit: 10,
      page: 1,
      // select: ['name', '_id', 'id', 'score'],
    });
  }

  static async findAllProducts({
    limit = 50,
    sort = 'ctime',
    page = 1,
    filter = {},
  }) {
    return await findAllProducts({
      limit,
      sort,
      page,
      filter,
      select: [],
    });
  }

  static async findProduct(productId) {
    return await findProduct(productId);
  }
}

module.exports = ProductService;
