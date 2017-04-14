let expect = require('expect');

let {generateMessage} = require('./message');

describe('GenerateMEssage', ()=>{
  it('should generate correct message object', ()=>{
    let from = 'Jen';
    let text = 'Some message';
    let message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
    //store res in variable
    //assert from match
    //assert text match
    //assert createdAt is number
  });
});
