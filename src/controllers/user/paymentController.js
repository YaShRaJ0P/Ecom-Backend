

const paymentMethod = async(req,res,next)=>{
    res.status(200).json({success:true, message:"hello from payment controller....."})
}



export {paymentMethod}