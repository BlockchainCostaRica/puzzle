import React from "react";
import { store } from "react-notifications-component";
import styled from "@emotion/styled";

interface INotification {
  title?: string;
  message?: string;
  link?: string;
}

export const NotificationInfo = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #8082c5;
`;

export const successMessage = (props: INotification) => {
  store.addNotification({
    title: props.title ?? "Congratulations!",
    message: props.link ? (
      <NotificationInfo>
        You can view the details of it in&nbsp;
        <a href={props.link}>Waves Explorer</a>
      </NotificationInfo>
    ) : (
      props.message ?? ""
    ),
    type: "success",
    insert: "bottom",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: { duration: 5000, onScreen: true },
  });
};

export const errorMessage = (props: INotification) => {
  store.addNotification({
    title: props.title ?? "Something went wrong!",
    message: props.message ?? "",
    type: "danger",
    insert: "bottom",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: { duration: 15000, onScreen: true },
  });
};
