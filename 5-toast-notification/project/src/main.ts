import '@/index.css';
import { NotificationData } from '@/constants';
import NotificationButton from '@/notificationButton';
import Notification from '@/notification';

const $notificationBtnBox = document.querySelector<HTMLDivElement>(
  '#notificationBtnBox',
)!;
const $notificationStack =
  document.querySelector<HTMLDivElement>('#notificationStack')!;

for (let type in NotificationData) {
  new NotificationButton($notificationBtnBox, type);
}

$notificationBtnBox.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.dataset.type) {
    new Notification($notificationStack, target.dataset.type);
  }
});
