
const createOrder = async(req,res,next)=>{
    res.status(200).json({success:true , message:"hello from order controller..."})
}



export {createOrder}