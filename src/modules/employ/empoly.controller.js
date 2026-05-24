import sendResponseToClient from "../response.js";
import { employService } from "./empoly.service.js"

const getAllEmploy = async(req, res) => {
  try {

    const result = await employService.getEmployDB(req.query);

    sendResponseToClient(res,200,true,'get all users',result)
  } catch (error) {
    sendResponseToClient(res,500,false,'something is wrong')
  }
}

// admin chang suer active status
const updateUserStatus = async (req, res) => {
  try {
    const { id, status } = req.body
    console.log(id,status)
    if (!id || !status) {
      sendResponseToClient(res, 404, false, 'id or status not found')
      return
    }
    const result = await employService.updateUserStatusDB(req.body)
    sendResponseToClient(res,200,true,'update success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'update not success !!');
  }
}
// employ chang own profile
const updateUserProfile= async (req, res) => {
  try {
    const { id, image } = req.body
    // console.log(id,status)
    if (!id || !image) {
      sendResponseToClient(res, 404, false, 'id or image not found')
      return
    }
    const result = await employService.updateUserProfileDB(req.body);
    sendResponseToClient(res,200,true,'update success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'update not success !!');
  }
}

const deleteEmploy = async (req, res) => {
  try {
   const {id}=req.params
    if (!id) {
     sendResponseToClient(res, 404, false, 'params is missing');
    }
    
    const result = await employService.deleteEmployDB(id)
    sendResponseToClient(res, 200, true, 'employ is deleted', result);
 } catch (error) {
   sendResponseToClient(res, 500, false, 'something is wrong');
 }
}



export const employController = {
  getAllEmploy,
  updateUserStatus,
  deleteEmploy,
  updateUserProfile,
};