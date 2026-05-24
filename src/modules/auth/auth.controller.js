import { authService } from "./auth.services.js"

export const register = async(req, res) => {
  try {
    const result = await authService.registerDB(req.body,res)
    // console.log(result)
    res.status(201).json(result)
  } catch (error) {
     res.status(500).json({message:error?.message})
  }
}
export const login = async(req, res) => {
  try {
    const result = await authService.loginDB(req.body,res)
    // console.log(result)
    // delete result.password
    res.status(201).json({token:result})
  } catch (error) {
     res.status(500).json({message:error?.message})
  }
}
export const authSingleUSer = async(req, res) => {
  try {
    const result = await authService.authUser(req?.user?.user_id)
    // console.log(result)
    delete result.password
    res.status(201).json(result)
  } catch (error) {
     res.status(500).json({message:error?.message})
  }
}

export const authController = {
  register,
  login,
  authSingleUSer,
};