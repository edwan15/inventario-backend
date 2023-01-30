const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const { fileSizeFormatter } = require("../utils/fileUpdate");
const Product = require("../models/ProductModel");



// creteProduct

const createProduct = asyncHandler(async (req, res) => {
  const { category, name, sku, description, entradas, salidas, stock } = req.body;


  

  // validation

  if (!name || !category || !sku || !description || !entradas || !salidas ) {
    res.status(400);
    throw new Error("por favor llena todos los  campos");
  }

  // handler Image

  // let fileData = {};
  // if (req.file) {
  //   let uploadedFile;
  //   try {
  //     uploadedFile = await cloudinary.uploader.upload(req.file.path, {
  //       folder: "inventario app",
  //       resource_type: "image",
  //     });
  //   } catch (error) {
  //     res.status(500);
  //     throw new Error("image could no be uploaded");
  //   }
  //   fileData = {
  //     fileName: req.file.originalname,
  //     filePath: uploadedFile.secure_url,
  //     fileType: req.file.mimetype,
  //     fileSize: fileSizeFormatter(req.file.size, 2),
  //   };
  // }

    // createProduct
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      entradas,
      salidas,
      stock: entradas - salidas ,
      
      description,
 
    });

    res.status(201).json(product);
  
});

// obtener todos los Products

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("createdAt");
  res.status(200).json(products);

});

// Obtener un solo producto

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Error Del Product");
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user Not autorizado");
  }
  res.status(200).json(product)
});

// Eliminar

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Actualizar

const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, entradas, salidas, description } = req.body;

  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw new Error("no  se encontraron los productos");
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Autorizado");
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "INVENTARIO-LOPOYO",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("image no puede subirse");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      entradas,
      salidas,
      description,
       stock: entradas - salidas ,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
