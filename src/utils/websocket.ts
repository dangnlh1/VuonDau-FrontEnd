import { toast } from 'react-toastify'

// import SockJS from 'sockjs-client'
const SockJS = require('sockjs-client')
import { Stomp } from '@stomp/stompjs';
import { closeWindow } from '@/utils/window';

let stompClient: any;
let notificationCount = 0;

export function connect() {
  var socket = new SockJS('http://103.173.255.39:8889/websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame: any) {
    console.log('Connected: ' + JSON.stringify(frame));
    // console.log(frame.);
    localStorage.setItem('session', frame.headers['user-name'])

    updateNotificationDisplay();

    stompClient.subscribe('/user/queue/private-message', function (message: any) {
      showMessage(JSON.parse(message.body).content);
    });


  });
}

function showMessage(message: string) {
  console.log(message);
  toast.success(message)
  closeWindow()
}

function updateNotificationDisplay() {

}