import React, { useState, useEffect } from "react";
import { httpClient } from './HTTPClient';

export default function Matricular() {



    const [stateAluno, setStateAluno] = useState({
        id: 0
    });

    const [stateAlunos, setStateAlunos] = useState({
        alunos: []
    });

    const [stateDisciplina, setStateDisciplina] = useState({
       id: 0 
    });

    const obterAlunosPorDisciplina = () => {
        httpClient().get("Disciplina/ListarAlunos?disciplinaId="+stateDisciplina.id)
            .then(r => {
                return r.json();
            })
            .then(r => {
                if(r != "Sem alunos.")
                {
                    let alunos = [];
                    r.forEach(aluno => {

                        alunos.push({
                            id: aluno.id,
                            aluno: aluno.nome,
                            email: aluno.email,
                            dataNascimento: aluno.dataNascimento,
                            disciplinaId: stateDisciplina.id
                        });
    
                    });                    
                    //sucesso
                    setStateAlunos({ alunos: alunos });
                }
                else
                    setStateAlunos({ alunos: [] });      
            })
            .catch((e) => {

                console.log(e);
                // alert("Deu erro.");
            });
    }

    const desmatricularAluno = (alunoAtual) => {
        let dados = {
            DisciplinaId: parseInt(alunoAtual.disciplinaId),
            AlunoId: parseInt(alunoAtual.id)
        }
        let p = httpClient().put("Disciplina/Desmatricular", dados);
        p.then(r => {
            return r;
        })
        .then(r => {
            if(r.ok)
            {
                obterAlunosPorDisciplina()
                alert("Aluno desmatriculado!");
            }
            else{
                alert("Oops... ocorreu um erro!");
            }
        });
    }

    const matricularAluno = () => {
        let dados = {
            DisciplinaId: parseInt(stateDisciplina.id),
            AlunoId: parseInt(stateAluno.id)
        }
        let p = httpClient().put("Disciplina/Matricular", dados);
        p.then(r => {
            return r;
        })
        .then(r => {
            if(r.ok)
            {
                obterAlunosPorDisciplina()
                alert("Aluno matriculado!");
            }
            else{
                alert("Aluno já está vinculado a disciplina ou disciplina e/ou aluno não existe...")
            }
        });
    }

    let saida = 
    <>
        <label>Aluno Id</label><br/>
        <input type="number" value={stateAluno.id} onChange={(event) => { setStateAluno({ id: event.target.value }) }}></input><br/>
        <label>Disciplina Id</label><br/>
        <input type="number" value={stateDisciplina.id} onChange={(event) => { setStateDisciplina({ id: event.target.value }) }}></input><br/>
        <button onClick={matricularAluno}>Matricular</button>
        <button onClick={obterAlunosPorDisciplina}>Listar</button>



            <h4>Alunos Encontrados</h4>
            <table >
                <tbody>
                    {stateAlunos.alunos.map((alunoAtual) => (<tr key={alunoAtual.id}
                        style={{ background: (alunoAtual.id == stateAluno.id ? "red" : ""), paddingBottom: 10 }}
                    >
                        <td>{alunoAtual.aluno}</td>
                        <td>{alunoAtual.email}</td>
                        <td>{alunoAtual.dataNascimento}</td>
                        <td>
                            <button type="button"
                                onClick={() => desmatricularAluno(alunoAtual)}>Desmatricular</button>                            
                        </td>
                    </tr>))}
                </tbody>
            </table>
    </>

    return (saida);
}