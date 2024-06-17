//This is a wrapper function

const asyncHandler = (requestHandler) => {
  //Async Handler with Promise
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next);
  };
};

export default asyncHandler;

// const asyncHandler=()=>{}
// const asyncHandler=(func)=>()={}//passing a HOF
// const asyncHandler=(func)=>async()={}

// const asyncHandler=(fn)=>async(req,res,next)=>{
//     //Async Handler with Try-catch

//     try{
//         await fn(req,res,next)

//     }
//     catch(error){
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }

// }
