import React, { useState, useEffect } from "react";
import { httpClient } from './HTTPClient';

export default function GerenciarAlunos() {

    const [stateAluno, setStateAluno] = useState({
        nomeAluno: "",
        email: "",
        dataNascimento: ""
    });

    const gravarAluno = () => {
        if (stateAluno.nomeAluno == "" || stateAluno.email == "" || stateAluno.dataNascimento == "") {
            alert("Informe os dados em todos os campos!")
            return;
        }

        let dados = {
            nome: stateAluno.nomeAluno,
            email: stateAluno.email,
            dataNascimento: stateAluno.dataNascimento
        }

        let p = httpClient().post("Aluno/Gravar", dados);
        p.then(r => {
            return r.json()
        })
        .then(r => {                
            window.location.href = "./ConsultarAlunos";
        })
        .catch((error) => {
            alert(error)
        })
    }


    let saida =
    <>
        <h4>Gerenciar Aluno</h4>
        <label>Nome</label><br/>
        <input type="text" value={stateAluno.nomeAluno} onChange={(event) => { setStateAluno({ ...stateAluno, nomeAluno: event.target.value}) }}/><br/>
        <label>Email</label><br/>
        <input type="email" value={stateAluno.email} onChange={(event) => { setStateAluno({ ...stateAluno, email: event.target.value}) }}/><br/>
        <label>Data de nascimento</label><br/>
        <input type="date" value={stateAluno.dataNascimento} onChange={(event) => { setStateAluno({ ...stateAluno, dataNascimento: event.target.value}) }}/><br/><br/>
        <button onClick={gravarAluno}>Salvar</button>
    </>

    return (saida);
}