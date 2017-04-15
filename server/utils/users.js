// addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor () {
    this.users= [];
  }
  addUser(id,name,room){
    let user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id){
    // return user that was removed
    let user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user)=> user.id !== id);
    }
    return user;
  }

  getUser(id){
    return this.users.filter((user)=>user.id ===id)[0];
  }

  getUserByName(name){
    return this.users.filter((user)=>user.name===name)[0];
  }

  getUserList(room){
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }

  isDuplicateUser(name,room){
    let duplicateUser = this.users.filter((user) => user.name === name && user.room === room);
    if(duplicateUser.length >0){
      return true;
    }
    return false;
  }
}

module.exports = {Users};
