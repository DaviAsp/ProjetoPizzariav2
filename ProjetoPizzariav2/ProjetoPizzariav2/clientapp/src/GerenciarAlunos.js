import React, { useState, useEffect } from "react";
import { httpClient } from './HTTPClient';
import { Input, Headings, Badge, Label } from "reactstrap";

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
        <h4>Gerenciar Alunos </h4>
        <Label>Nome</Label><br/>
        <Input  value={stateAluno.nomeAluno} onChange={(event) => { setStateAluno({ ...stateAluno, nomeAluno: event.target.value}) }}/><br/>
        <label>Email</label><br/>
        <Input name="email"  type="email" value={stateAluno.email} onChange={(event) => { setStateAluno({ ...stateAluno, email: event.target.value}) }}/><br/>
        <label>Data de nascimento</label><br/>
        <Input type="date" value={stateAluno.dataNascimento} onChange={(event) => { setStateAluno({ ...stateAluno, dataNascimento: event.target.value}) }}/><br/><br/>
        <button onClick={gravarAluno}>Salvar</button>
    </>

    return (saida);
}