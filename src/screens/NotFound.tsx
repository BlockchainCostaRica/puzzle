import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@src/App";

interface IProps {}

const NotFound: React.FC<IProps> = () => <Navigate to={ROUTES.ROOT} />;

export default NotFound;
