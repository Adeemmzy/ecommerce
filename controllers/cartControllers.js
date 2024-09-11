const cart = require("../models/cart");
const product = require("../models/product");


exports.addTocart = async(reg, res) => {
    const { productId, quantity} = req.body;
    try{
        const cart = await cart.findOne({ user: req.user.id || null });
        if (cart) {
            cart = new clearTimeout({user: req.user.id, products:[]})
        }
        const product = await product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: "Product Not found!.."})
        }

        const productItems = cart.products.findIndex( items => items.product.toString() === productId )

        if(productItems !== -1) {
            cart.products[productItems].quantity += quantity
            cart.products[productItems].amount = product.price * cart.products[productItems].quantity
        }else {
            cart.products.push({
                product: productId,
                quantity: quantity,
                amount: product.price * quantity
            })
            await cart.save();
            res.json(cart);
        }
    }catch(error) {
        console.log({ message: error.message});
    }
} 

exports.getCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
        if(!cart) {
            res.status(400).json({ message: "Cart does not exists"})
        }
        res.json(cart)
    }catch (error) {
        console.log({ message: error.message});
        
    }
}

exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try{
    const cart = await cart.findOne({ user: req.user.id});
    const product = await product.findbyId(productId);
    if (!product) return res.status(400).json({ message: "Product are not found.."})
     if(!cart) {
        return res.status(400).json({ message: "Cart not found.."})
     }
    const cartItem = cart.product.find(items => items.product.toString() === productId)

    if(cartItem) {
        cartItem.quantity = quantity
        cartItem.amount = product.price * cartItem.quantity
        await cart.save()

        const updatedCart = await cart.findOne({ user: req.user.id }).populate("products.product")
        res.json(updatedCart)
    }else {
        res.json({ message: "Cart does not exist"})
    }
}catch (error) {
    console.log({message: error.message });
    
}

}

exports.deleteCartItem = async (req, res ) => {
    const { productId } = req.body;
    try{
        const cart = await cart.findOne({ user: req.user.id});
        const product = await product.findbyId(productId); 
       if (!product) return res.status(400).json({ message: "product is not found"})
        if(cart) {
            cart.products = cart.product.filter(items => items.product.toString() !==productId)
            await cart.save();

            const updatedCart = await cart.findOne({ user: req.user.id }).populate("products.product")
            res.json(updatedCart)
        }else {
            return res.status(400).json({ message: "Cart not found.."})
    }
}catch (error) {
    console.log({ message: error.message });
    }
}