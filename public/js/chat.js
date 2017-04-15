let socket = io();


function scrollToBottom(){
  //selector
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  //heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function (){
  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href="/";
    } else {
      console.log('No error');
    }
  });
});


socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('updateUserList',function(users) {
  let ol =jQuery('<ol></ol');

  users.forEach( function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(mess){
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template,{
    text: mess.text,
    from: mess.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // let li = jQuery('<li></li>');
  // li.text(`${mess.from} (${formattedTime}): ${mess.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(mess){
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template,{
    from: mess.from,
    url: mess.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();

  // let li = jQuery(`<li></li>`);
  // let a = jQuery(`<a target="_blank">My Current Location</a>`);
  //
  // li.text(`${mess.from} (${formattedTime}): `);
  // a.attr('href', mess.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});
// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(data){
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e){
  e.preventDefault();
  let messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser!');
  }
  locationButton.attr('disable', 'disable').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});