import jwt from 'jsonwebtoken';
export const protectUserRoute = async(req,res,next)=>{
  const token = req.cookies.UserToken;
  if(!token){
    return res.status(401).json({code:0,message:"you are not authenticated"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({code:0,message:"your token is expired"})
  }
}
export const protectAdminRoute = async(req,res,next)=>{
  const token = req.cookies.AdminToken;
  if(!token){
    return res.status(401).json({code:0,message:"you are not authenticated"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({code:0,message:"your token is expired"})
  }
}
