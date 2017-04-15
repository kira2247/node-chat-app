const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
  let users;

  beforeEach(() =>{
    users = new Users();
    users.users=[{
      id:'1',
      name:'Mike',
      room:'Node Course'
    },{
      id:'2',
      name:'Jen',
      room:'React Course'
    },{
      id:'3',
      name:'Julie',
      room:'Node Course'
    }];
  });

  it('should add new user', ()=>{
    let users = new Users();
    let user ={
      id:'123',
      name:'Tan',
      room:'The Office Fans'
    };
    let resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', ()=>{
    let userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });

});
