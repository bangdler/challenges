import { NotificationData, NotificationKey } from '@/constants';

export default class NotificationButton {
  target: HTMLElement;
  element: HTMLElement;
  type: NotificationKey;
  constructor(target, type) {
    this.target = target;
    this.element = document.createElement('button');
    this.type = type;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.element.className = `w-[440px] h-[76px] flex justify-center items-center m-[5px] rounded ${
      NotificationData[this.type].class.bg
    } text-2xl text-white`;
    this.element.dataset.type = this.type;
    this.element.innerHTML = NotificationData[this.type].title;

    this.target.appendChild(this.element);
  }
}
