import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConnection } from "../../../stores/slice/connectionStore";
import { APIGetConnection } from "../../../apis/connection/connection";
import AppContent from "./AppContent";

const DefaultLayout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connectionCheck = useCallback(async () => {
    const fetchData = await APIGetConnection();

    if (fetchData.data.length > 0) {
      navigate("/", { replace: true });
      dispatch(setConnection(fetchData.data[0]));
    } else {
      navigate("/connection", { replace: true });
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    connectionCheck();
  }, [connectionCheck]);

  return (
    <>
      <AppContent />
    </>
  );
};

export default DefaultLayout;
