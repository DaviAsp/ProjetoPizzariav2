import React, { useState, useEffect } from "react";
import { httpClient } from './HTTPClient';
import { Form, FormGroup, Button, Input, Col, Row, Table, 
    ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";


export default function ConsultarAlunos() {


    const [stateAluno, setStateAluno] = useState({
            codigo: 0,
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
        <h4>Consultar Alunos </h4>
          <Form>
            <Row>
                <Col md={6}>
                    <FormGroup>
                       <Input type="search" value={stateAluno.nomeAluno} onChange={(event) => { setStateAluno({ nomeAluno: event.target.value }) }}></Input>
                    </FormGroup>
                    <Button color="primary" onClick={obterAlunosPorNome}>Consultar</Button>
                </Col>
            </Row>
          </Form>  
            <h4>Alunos Encontrados</h4>
            <Table hover bordered>
                <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Nome
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Data de Nascimento
                            </th>
                            <th>
                                Excluir?
                            </th>
                        </tr>
                </thead>
                <tbody>
                    {stateAlunos.alunos.map((alunoAtual) => (<tr key={alunoAtual.id}
                        style={{ background: (alunoAtual.id == stateAluno.id ? "red" : ""), paddingBottom: 10 }}
                    >
                        <td>{alunoAtual.id}</td>
                        <td>{alunoAtual.aluno}</td>
                        <td>{alunoAtual.email}</td>
                        <td>{alunoAtual.dataNascimento}</td>
                        <td>
                            <Button type="button" color="danger"
                                onClick={() => excluirAluno(alunoAtual)}>X</Button>                            
                        </td>
                    </tr>))}
                </tbody>
            </Table>


        </>

    return (saida);
}