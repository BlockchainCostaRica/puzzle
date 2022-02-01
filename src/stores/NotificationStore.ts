import notification from "rc-notification";
import { makeAutoObservable } from "mobx";
import RootStore from "@stores/RootStore";
import getAlert, { closeAlertIcon } from "@src/utils/alertUtil";

export type TNotifyOptions = Partial<{
  duration: number;
  closable: boolean;
  key: string;

  type: "error" | "info" | "warning" | "success";
  link?: string;
  linkTitle?: string;
  title: string;
  style: { [key: string]: string | number };
}>;

const style = {
  boxShadow: "0px 8px 24px rgba(54, 56, 112, 0.16)",
  borderRadius: 12,
  padding: 16,
  border: "1px solid #F1F2FE",
};

const styles = {
  error: {
    ...style,
  },
  warning: {
    ...style,
  },
  info: {
    ...style,
  },
  success: {
    ...style,
  },
};

class NotificationStore {
  public rootStore: RootStore;
  _instance?: any;

  isOpenLoginDialog = false;
  isOpenMobileExplorer = false;
  isOpenMobileAccount = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    notification.newInstance(
      { closeIcon: closeAlertIcon },
      (notification: any) => (this._instance = notification)
    );
    makeAutoObservable(this);
  }

  notify(content: string, opts: TNotifyOptions = {}) {
    if (opts.key) {
      this._instance.removeNotice(opts.key);
    }
    const type = opts.type || "info";

    try {
      this._instance &&
        this._instance.notice({
          ...opts,
          placement: "center",
          content: getAlert(content, { ...opts, type }),
          style: {
            ...styles[type],
            ...opts.style,
          },
          className: "custom-notification",
          duration: opts.duration ?? 50,
          key: opts.key,
          closable: true,
          closeIcon: closeAlertIcon,
        });
    } catch (e) {
      console.error(content);
    }
  }
}

export default NotificationStore;
