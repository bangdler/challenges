export enum NotificationKey {
  error = 'Error',
  success = 'Success',
  info = 'Info',
  warning = 'Warning',
}

export const NotificationData = {
  [NotificationKey.error]: {
    title: NotificationKey.error,
    class: {
      bg: 'bg-Error',
      border: 'border-Error',
    },
    icon: '❌',
  },
  [NotificationKey.success]: {
    title: NotificationKey.success,
    class: {
      bg: 'bg-Success',
      border: 'border-Success',
    },
    icon: '✅',
  },
  [NotificationKey.info]: {
    title: NotificationKey.info,
    class: {
      bg: 'bg-Info',
      border: 'border-Info',
    },
    icon: 'ℹ️️',
  },
  [NotificationKey.warning]: {
    title: NotificationKey.warning,
    class: {
      bg: 'bg-Warning',
      border: 'border-Warning',
    },
    icon: '⚠️',
  },
};
