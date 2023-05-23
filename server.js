import express from 'express';
import mongoose from 'mongoose';
import Product from './models/product.js';
import ApiFeature from './Service/apiFeature.js';
let app=express();
async function connectDB(url){
    try {
        await mongoose.connect(url,{dbName:'class'})
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}
connectDB('mongodb://0.0.0.0:27017/');
app.get('/products', async (req,res)=>{
        try {
            const resPerPage=4;
            const productsCount= await Product.countDocuments();
            const apiFeature=new ApiFeature(Product.find(),req.query)
            .search()
            .filter()
 
          let result= await apiFeature.query;
          const filterProductsCount=result.length;
        
          apiFeature.pagination(resPerPage);

          result= await apiFeature.query.clone();

            res.json({
                productsCount,
                filterProductsCount,
                resPerPage,
                product:result,
            })
        } catch (error) {
            console.log(error);
        }
})


app.listen(5000,()=>{
    console.log('Server Running at port 5000')
})

// http://localhost:5000/products?keyword="Binod" &page=1&category="laptop"

// {
//     keyword: '"Binod" ',
//     page: '1',
//     category: '"laptop"',
//   }