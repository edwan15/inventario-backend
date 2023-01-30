const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema({

user:{
  type:mongoose.Schema.Types.ObjectId,
  require:true,
  ref:"User"
},

  name:{
    type:String,
    require:[true,"por favor ingresa un nombre"],
    trim:true
  },
  sku:{
    type:String,
    require:true,
    default:"SKU",
    trim:true
  },
  category:{
    type:String,
    require:[true,"por favor ingresa una categoria"],
    trim:true,
  },
  entradas:{
    type:String,
    require:[true,"por favor ingresa Los productos de entrada"]
  },
  salidas:{
    type:String,
    require:[true,"por favor ingresa la cantidad de las salidas"]
  },
  stock:{
    type:String,
    
    

  },
  description:{ 

    type:String, 
    require:[true,"por favor puedes escruibir tu descripcion"],
    trim:true
  },

  

  

      


  // image:{
  //   type:String,
  //   default:{}
  // },
},
{
  timestamps:true
}
);

const Product = mongoose.model("product",ProductSchema);

module.exports = Product;