import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

export default function Menu() {

    let saida = 
    <nav className='menu'>
        <Link to="/gerenciarAlunos">Gerenciar Alunos</Link> |
        <Link to="/consultarAlunos">Consultar Alunos</Link>
        <Link to="/matricular">Matricular</Link>
    </nav> 

    return saida;
} 