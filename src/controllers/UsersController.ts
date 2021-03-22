import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import Users from "../models/User";

import CreateUserDTO from "../interfaces/CreateUserDTO";
import UpdateUserDTO from "../interfaces/UpdateUserDTO";
import IndexUserDTO from "../interfaces/IndexUserDTO";
import ShowUserDTO from "../interfaces/ShowUserDTO";

export = {
  async index(request: Request, response: Response){
    try{
      const { home_id } = request.query;
      const home_idStr = String(home_id);
      const find = await Users.findByHomeId(home_idStr);
      const user = find?.map((user: ShowUserDTO) => {
        return ({id: user.id, username: user.username, email: user.email});
      })
      return response.json(user);
    }catch(err){
      console.log(err);
    }
  },

  async findOne(request: Request, response: Response){
    try{
      const { id } = request.params;
      const find = await Users.findById(id);
      const user = find?.map((user : IndexUserDTO) =>{
        return({id: user.id, username: user.username, email: user.email, home: user.home_id});
      })
      if(user){
        return response.json(user[0]);
      }
    }catch(err){
      console.log(err);
    }
  },

  async store(request: Request, response: Response){
    try{
      const {
        username,
        email,
        password
      } : CreateUserDTO = request.body;
        bcrypt.hash(password, 10, async (err, hash) =>{
          const user = await Users.create({username,email, password: hash});
          return response.json(user);
      });
    }catch(err){
      console.log(err);
    }
  },

  async update(request: Request, response: Response){
    try{
      const {
        username,
        email,
        new_password,
        home_id,
      } : UpdateUserDTO = request.body;
      const { id } = request.params;
      if(new_password){
        bcrypt.hash(new_password, 10, async (err, hash) =>{
          const user = await Users.update({username, email, password: hash, home_id}, id);
          return response.json(user);
        });
      }else{
        const findPwd = await Users.findById(id);
        const pwdFind = findPwd?.map((user:IndexUserDTO) => {
          return user.password;
        });
        if(pwdFind){
          const query = await Users.update({username, email, password:pwdFind[0], home_id}, id);
          const user = query?.map((user: IndexUserDTO) => {
            return({username: user.username, email: user.email})
          })
          if(user){
            return response.json(user[0]);
          }
        }
      }
    }catch(err){
      console.log(err);
    }
  },

  async delete(request: Request, response: Response){
    try{
      const { id } = request.params;
      const res = await Users.findByIdAndDelete(id);
      return response.json(res);
    }catch(err){
      console.log(err);
    }
  }
}
