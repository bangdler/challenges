import { NotificationData, NotificationKey } from '@/constants';

const CLOSE_DELAY = 4000;

export default class Notification {
  target: HTMLElement;
  element: HTMLElement;
  type: NotificationKey;
  timer: NodeJS.Timeout | null;
  startTime: number;
  endTime: number;
  constructor(target, type) {
    this.target = target;
    this.element = document.createElement('div');
    this.type = type;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + CLOSE_DELAY;
    this.timer = null;
    this.init();
  }

  init() {
    this.render();
    this.timer = setTimeout(() => {
      this.unmount();
    }, CLOSE_DELAY);
    this.setEvent();
  }

  render() {
    this.element.className = `w-[440px] h-[76px] flex justify-center items-center gap-[10px] m-[5px] p-[5px] rounded bg-white border-b-2 border-solid ${
      NotificationData[this.type].class.border
    } shadow-md translate-x-[-100%] animate-notify`;

    this.element.innerHTML = `
      <div class='flex justify-center items-center w-[50px] h-[50px]'>${
        NotificationData[this.type].icon
      }</div>
      <span class='grow text-xl'>${
        NotificationData[this.type].title
      } toast notification</span>
      <button id='closeBtn' class='text-lg w-[50px] text-slate-400'>닫기</button>
    `;

    this.target.appendChild(this.element);
  }

  unmount() {
    this.element.classList.remove('translate-x-[-100%]');
    this.element.classList.remove('animate-notify');
    this.element.classList.add('animate-remove');
    setTimeout(() => {
      this.element.remove();
    }, 500);
  }

  setEvent() {
    this.element.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.id === 'closeBtn') {
        this.unmount();
      }
    });
    this.element.addEventListener('mouseenter', () => {
      this.startTime = new Date().getTime();
      if (this.timer) {
        clearTimeout(this.timer);
      }
    });
    this.element.addEventListener('mouseleave', () => {
      const time = this.endTime - this.startTime;
      this.timer = setTimeout(() => {
        this.unmount();
      }, time);
    });
  }
}
