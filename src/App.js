import { useDispatch } from "react-redux";
import CustomRoutes from "./router/custom-routes";
import secureLocalStorage from "react-secure-storage";
import { getUser } from "./api/user-service";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  
  const loadData = async() => {
    try {
      
      const token = secureLocalStorage.getItem("token");
    
      
      if(token){
        const resp = await getUser()
        dispatch(loginSuccess(resp.data))
      }

    } catch (err) {
      
      dispatch(loginFailed())

    }
   }

   useEffect(() => {
     loadData()
   
   }, [])
   
  
  return (
    <>
      <CustomRoutes />
    </>
  );
}

export default App;
