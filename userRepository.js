import DBLocal from "db-local";
const { Schema } = new DBLocal({path:'./db'})
import crypto from 'crypto';

const User = Schema('User',{
    _id:{type:String , required:true},
    username:{type:String , required:true},
    password:{type:String , required:true},
})

export default class UserRepository {
  static create({ username, password }) {
    if(typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid input');
    }

    if(username.length < 3 || password.length < 3) {
      throw new Error('Invalid input');
    }

    const user = User.findOne({ username });
    if (user) {
      throw new Error('User already exists');
    }

    const id = crypto.randomUUID();

    User.create({ _id:id, username, password });
  }
  static login({ username, password }) {}
}
