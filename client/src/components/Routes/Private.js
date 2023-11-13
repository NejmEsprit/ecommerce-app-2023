import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("/api/auth/user-auth");
        if (res.data.ok) {
          setOk(true);
          console.log('first')
        } else {
          setOk(false);
          console.log('first')
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner />;
  }