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
  boxShadow: "0px 6px 20px rgba(155, 166, 177, 0.3)",
  borderRadius: "0",
  padding: 0,
};

const styles = {
  error: {
    ...style,
    borderTop: "2px solid #EF7362",
  },
  warning: {
    ...style,
    borderTop: "2px solid #FFD56A",
  },
  info: {
    ...style,
    borderTop: "2px solid #5A8AFF",
  },
  success: {
    ...style,
    borderTop: "2px solid #7ECF81",
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

  notify(content: string | JSX.Element, opts: TNotifyOptions = {}) {
    console.log(opts);
    if (opts.key) {
      this._instance.removeNotice(opts.key);
    }
    const type = opts.type || "info";

    try {
      this._instance &&
        this._instance.notice({
          ...opts,
          content: getAlert(content, { ...opts, type }),
          style: { ...styles[type], ...opts.style },
          duration: opts.duration || 1000000,
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
