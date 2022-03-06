//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyDnraxlMmbX5fQaF1jhHloHceaXMF2CMuk",
      authDomain: "practice-f8f76.firebaseapp.com",
      databaseURL: "https://practice-f8f76-default-rtdb.firebaseio.com",
      projectId: "practice-f8f76",
      storageBucket: "practice-f8f76.appspot.com",
      messagingSenderId: "34334753004",
      appId: "1:34334753004:web:44d8e3eb9c14dec797a5c9"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    username = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

    function Send()
    {
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                like: 0,
                message: msg,
                name: username
          });
          document.getElementById("msg").value = "";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("text_messages").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";


row = message_with_tag +like_button + span_with_tag;      
document.getElementById("text_messages").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
console.log("liked is clicked" + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_like = Number(likes) + 1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
      like: updated_likes
});
}

function logOut()
{
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location.replace ("index.html");
}