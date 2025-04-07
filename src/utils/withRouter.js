import { useNavigate, useParams, useLocation } from "react-router-dom";
import React from "react";

export function withRouter(Component) {
  return function ComponentWithRouterProps(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return <Component {...props} router={{ navigate, params, location }} />;
  };
}
