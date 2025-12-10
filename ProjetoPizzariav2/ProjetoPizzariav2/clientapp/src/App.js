import React from 'react';
import Menu from './Menu';

import { httpClient } from './HTTPClient';
import GerenciarAlunos from './GerenciarAlunos'
import ConsultarAlunos from './ConsultarAlunos'
import Matricular from './Matricular'
import { Button } from 'reactstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

export default function App() {
    let saida = 
    <div>
        
            <Menu />
                <Routes>
                    <Route path="/gerenciarAlunos" element={<GerenciarAlunos />}/>
                    <Route path="/consultarAlunos" element={<ConsultarAlunos />}/>
                    <Route path="/matricular" element={<Matricular />}/>
                </Routes>
            
    </div>
    
    return saida;
} 