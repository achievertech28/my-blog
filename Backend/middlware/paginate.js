import { model } from "mongoose";

export const paginate = (model, options = {}) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      // Build query filter from req.query (excluding pagination params)
      const filter = { ...req.query };
      delete filter.page;
      delete filter.limit;
      delete filter.sort;

      // get total count for pagination calculations
      const totalItems = await model.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / limit);

      // build the query
      let query = model
        .find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      // Apply additional options
      if (options.populate) {
        query = query.populate(options.populate);
      }

      if (options.select) {
        query = query.select(options.select);
      }

      // Handle sorting
      const sortBy = req.query.sort || options.sort || null;
      query = query.sort(sortBy);

      const results = await query;

      // Calculate pagination metadata
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      // Attach pagination data to res.local for use in controller
      res.locals.paginatedResults = {
        success: true,
        count: results.length,
        data: results,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          nextPage: hasNextPage ? page + 1 : null,
          prevPage: hasPrevPage ? page - 1 : null,
          limit: limit,
        },
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

// export const paginate = (model) => {
//   return async (req, res, next) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 5;

//       // get total count for pagination calculations
//       const totalItems = await model.countDocuments();
//       const totalPages = Math.ceil(totalItems / limit);

//       let query = model
//         .find()
//         .limit(limit * 1)
//         .skip((page - 1) * limit);

//       const results = await query;

//       //   calculate pagintion metadata
//       const hasNextPage = page < totalPages;
//       const hasPrevPage = page > 1;

//       // Attach pagination data to res.locals for use in controllers
//       res.locals.paginatedResults = {
//         success: true,
//         count: results.length,
//         data: results,
//         pagination: {
//           currentPage: page,
//           totalPages: totalPages,
//           totalItems: totalItems,
//           hasNextPage: hasNextPage,
//           hasPrevPage: hasPrevPage,
//           nextPage: hasNextPage ? page + 1 : null,
//           prevPage: hasPrevPage ? page - 1 : null,
//           limit: limit,
//         },
//       };

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
