import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactFragment } from "react";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.JWT === null) {
      navigate("/");
    }
  }, [props.JWT]);

  if (props.JWT === null) {
    return (
      <div className="">
        <h1>PUT A SPINNER HERE</h1>
      </div>
    );
  } else {
    return (
      <ReactFragment>
        <div>{props.children}</div>
      </ReactFragment>
    );
  }
};

export default ProtectedRoute;
