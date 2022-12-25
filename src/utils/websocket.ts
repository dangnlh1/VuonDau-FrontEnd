import { toast } from 'react-toastify'

const SockJS = require('sockjs-client')
import { Stomp } from '@stomp/stompjs';
import { closeWindow } from '@/utils/window';

let stompClient: any;
let notificationCount = 0;

export function connect() {
  var socket = new SockJS('http://103.173.255.39:8889/websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame: any) {
    localStorage.setItem('session', frame.headers['user-name'])

    updateNotificationDisplay();

    stompClient.subscribe('/user/queue/private-message', function (message: any) {
      showMessage(JSON.parse(message.body).content);
    });


  });
}

function showMessage(message: string) {
  toast.success(message)
  closeWindow()
}

function updateNotificationDisplay() {

}