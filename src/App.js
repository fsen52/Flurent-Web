import { useDispatch } from "react-redux";
import CustomRoutes from "./router/custom-routes";
import secureLocalStorage from "react-secure-storage";
import { getUser } from "./api/user-service";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";
import { useEffect, useState } from "react";
import LoadingPage from "./pages/common/loading-page";
import { settings } from "./utils/settings";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  const loadData = async() => {
    try {
      
      let token = secureLocalStorage.getItem("token");
    
      
      if(token){
        const resp = await getUser()
        dispatch(loginSuccess(resp.data))
      }

    } catch (err) {
      
      dispatch(loginFailed())

    } finally{
      setLoading(false);
    }
   }

   useEffect(() => {
     loadData()
     document.title = `${settings.siteName} | A Car Rental Project`
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   
  
  return (
    <> 
      {loading ? <LoadingPage/> : <CustomRoutes/>}
    </>
  );
}

export default App;
