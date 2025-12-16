import Product from "../models/product.js";

export async function createProduct(req,res){ //create a product

    if(req.user == null){  //verify there is user(authrntication)
        res.status(403).json({
            message: "Please login to create a product"
        })
        return;
    }

    if(req.user.role != "admin"){ //authorization
        res.status(403).json({
            message : "You are not authorize to create a product" //normal users can't create products. only admins can create products
        })
        return;
    }

    const product = new Product(req.body)

    try{
        const response = await product.save()

        res.json({
            message : "product created successfully",
            product : response
        })
    }
    catch(error){
        console.error("error creating product:", error);
        return res.status(500).json({message: "Failed to create product"});
    }
}

