const Model = require("../model/Product");
const axios = require("axios");
exports.getProduct = async (req, res) => {
  const data = await Model.find();
  res.status(200).json({
    sucess: true,
    message: "Product geted Sucessfully",
    data,
  });
};
exports.addProduct = async (req, res) => {
  const data = await Model.create(req.body);
  res.status(201).json({
    sucess: true,
    message: "Product created Sucessfully",
    data,
  });
};
exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const data = await Model.findById(id);
  res.status(200).json({
    sucess: true,
    message: "Single Product geted Sucessfully",
    data,
  });
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = await Model.findByIdAndUpdate(id, body, { new: true });
  res.status(200).json({
    sucess: true,
    message: "Product Updated Sucessfully",
    data,
  });
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const data = await Model.findById(id);
  await data.deleteOne();
  res.status(200).json({
    sucess: true,
    message: `Product with this ${id} id deleted Sucessfully `,
  });
};
exports.protectUser = async (req, res) => {
  const token = await req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decodeToken = await jwt.decode(token);
    const varifyToken = await jwt.verify(decodeToken, process.env.KEY);
    req.user = varifyToken;
  } catch (error) {
    res.status(401).json({
      message: "invalid",
    });
  }
};

// http://localhost:8080/api/v1/product/
// http://localhost:8080/api/v1/paginate?page=1&limit=15&sort=title&asc=true&search=Almonds
// http://localhost:8080/api/v1/paginate?page=1&limit=10&sort=newest&asc=true

exports.paginateResult = async (req, res) => {
  let { page, limit, sort, asc, search } = req.query;
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 10;
  }
  // const endIndex = page * limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let query = Model.find().skip(startIndex).limit(limit);

  // Filter logic for product search
  if (search) {
    const regex = new RegExp(`.*${search}.*`, "i");
    query = query.or([{ title: regex }]);
  }

  // Sort logic
  if (sort) {
    const sortField = sort === "newest" ? "createdAt" : "title";
    const sortOrder = asc ? 1 : -1;
    if (sortField) {
      query = query.sort({ [sortField]: sortOrder });
    }
  }
  const data = await query;
  if (endIndex < data.length) {
    data.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    data.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    res.status(200).json({
      page: page,
      limit: limit,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Interval Server Error",
    });
  }
};

// exports.paginateResult = (req, res) => {
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const results = {};
//   const model = [];
//   if (endIndex < model.length) {
//     results.next = {
//       page: page + 1,
//       limit: limit,
//     };
//   }

//   if (startIndex > 0) {
//     results.previous = {
//       page: page - 1,
//       limit: limit,
//     };
//   }
//   try {
//     res.status(200).json({
//       results
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// exports.paginateResult = async (req, res) => {
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const results = {};

//   try {
//     const response = await axios.get("https://localhost/api/v1/");
//     const apiData = response.data.data;

//     if (endIndex < apiData.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     const paginatedData = apiData.slice(startIndex, endIndex);
//     results.results = paginatedData;
//     res.status(200).json({ results });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
