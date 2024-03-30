import { lazy, Suspense, useEffect } from 'react';

/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import { Switch, withRouter,Route } from 'react-router-dom';

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

import useAuth from './hooks/useAuth';

// import Error403 from './jsx/pages/Error403';
const Error403 = lazy(() => import("./jsx/pages/Error403"));


function App (props) {
    const [isLogin, token, handleLogout, userName] = useAuth();
//   console.log(token);
//   console.log(userName)
    let routes = (  
        <Switch>
        <Route path='/page-error-403' component={Error403} />
        </Switch> 
    );
   
		return (
			<>
                {isLogin?(<Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                       
                    <Index />
                    
                
                   
                </Suspense>
                ):( 
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                > 
                 
                  <Error403 handleLogout={handleLogout} />
                
              
            </Suspense>
           
              )}
               
            </>
        );
	

};



export default withRouter(App); 

