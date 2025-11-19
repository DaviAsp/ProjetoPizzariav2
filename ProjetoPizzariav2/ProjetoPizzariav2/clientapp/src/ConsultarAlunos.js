import React, { useState, useEffect } from "react";
import { httpClient } from './HTTPClient';

export default function ConsultarAlunos() {


    const [stateAluno, setStateAluno] = useState({
        nomeAluno: ""
    });

    const [stateAlunos, setStateAlunos] = useState({
        alunos: []
    });

    const obterAlunosPorNome = () => {

        httpClient().get("Aluno/ObterPorNome?nome="+stateAluno.nomeAluno)
            .then(r => {
                return r.json();
            })
            .then(r => {

                let alunos = [];

                r.forEach(aluno => {

                    alunos.push({
                        id: aluno.id,
                        aluno: aluno.nome,
                        email: aluno.email,
                        dataNascimento: aluno.dataNascimento
                    });

                });
                
                //sucesso
                setStateAlunos({ alunos: alunos });
            })
            .catch((e) => {

                console.log(e);
                // alert("Deu erro.");
            });


    }

    const excluirAluno = (alunoAtual) => {
        debugger
        if (!window.confirm(`Deseja excluir: "${alunoAtual.aluno}"?`)) {
            return;
        }

        let p = httpClient().delete("Aluno/Excluir?id=" + alunoAtual.id);

        p.then(r => {
            return r;
        })
        .then(r => {
            if(r.ok)
            {
                let alunos = stateAlunos.alunos;
                let posicao = alunos.findIndex((f) => f.id == alunoAtual.id);
                alunos.splice(posicao, 1);

                setStateAlunos({
                    alunos
                });
            }
            else
                alert("não é possível excluir um aluno vinculado a uma disciplina!");
        })
        .catch((error) => {
            alert("Deu erro"+error);
        })
    }

    let saida =
        <>
            <input type="text" value={stateAluno.nomeAluno} onChange={(event) => { setStateAluno({ nomeAluno: event.target.value }) }}></input>
            <button onClick={obterAlunosPorNome}>Consultar</button>


            <h4>Alunos Encontrados</h4>
            <table >
                <tbody>
                    {stateAlunos.alunos.map((alunoAtual) => (<tr key={alunoAtual.id}
                        style={{ background: (alunoAtual.id == stateAluno.id ? "red" : ""), paddingBottom: 10 }}
                    >
                        <td>{alunoAtual.id}</td>
                        <td>{alunoAtual.aluno}</td>
                        <td>{alunoAtual.email}</td>
                        <td>{alunoAtual.dataNascimento}</td>
                        <td>
                            <button type="button"
                                onClick={() => excluirAluno(alunoAtual)}>X</button>                            
                        </td>
                    </tr>))}
                </tbody>
            </table>

        </>

    return (saida);
}