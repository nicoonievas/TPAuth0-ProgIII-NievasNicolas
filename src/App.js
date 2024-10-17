import React from 'react';
import Style from "./App.css";
import { Routes, Route } from "react-router-dom";
import LeftMenu from "./Components/LeftMenu";
import { useAuth0 } from '@auth0/auth0-react';
import Main from "./Components/Main";
import AppAuth0 from './Auth0/AppAuth0';

function App() {
    const { isAuthenticated, isLoading } = useAuth0(); // Obtener estado de autenticación

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>Cargando...</div>; // O cualquier componente de carga que prefieras
    }

    return (
        <div className={Style.App}>

            {isAuthenticated ? (
                <>
                    <LeftMenu />
                    <Routes>
                        <Route path="/" element={<Main />} />
                    </Routes>
                </>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1>No estás autenticado</h1>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <AppAuth0 />
                    </div>
                </div>
            )}


        </div>
    );
}

export default App;

// import React from 'react';
// import { Route, Routes } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import Style from "./App.module.css";
// import AuthButtons from './componentes/AuthButtons'; // Componente para botones de autenticación
// import LeftMenu from './componentes/LeftMenu'; // Menú lateral
// import Main from './componentes/Main'; // Componente principal

// function App() {
//     const { isAuthenticated, isLoading } = useAuth0(); // Obtener estado de autenticación y estado de carga

//     // Si Auth0 está cargando, puedes mostrar un mensaje de carga
//     if (isLoading) {
//         return <div>Cargando...</div>; // O cualquier componente de carga que prefieras
//     }

//     return (
//         <div className={Style.App}>
//             {isAuthenticated ? (
//                 <>
//                     <LeftMenu />
//                     <Routes>
//                         <Route path="/" element={<Main />} />
//                     </Routes>
//                 </>
//             ) : (
//                 <div style={{ textAlign: 'center', marginTop: '50px' }}>
//                     <h1>No estás autenticado</h1>

//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         <AuthButtons />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;