const product = require('../product.model');
const { convertToObjectIdMongodb } = require('../../utils');

const queryProduct = async ({ query, limit, skip }) => {
  return await product.find(query).limit(limit).skip(skip).exec();
};

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === 'ctime' ? { _id: 1 } : { _id: -1 };

  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean();

  return products;
};

const findProduct = async productId => {
  const foundProduct = await product.findById(productId);

  return foundProduct;
};

const searchProductByText = async ({
  keySearch,
  limit = 10,
  page = 1,
  select,
}) => {
  // const regexSearch = new RegExp(keySearch);
  const regexSearch = `"${keySearch}"`;
  const skip = limit * (page - 1);

  const results = await product
    .find(
      {
        $text: { $search: regexSearch },
      },
      {
        score: {
          $meta: 'textScore',
        },
      },
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .skip(skip)
    .select(select);

  return results;
};

module.exports = {
  searchProductByText,
  queryProduct,
  findAllProducts,
  findProduct,
};
