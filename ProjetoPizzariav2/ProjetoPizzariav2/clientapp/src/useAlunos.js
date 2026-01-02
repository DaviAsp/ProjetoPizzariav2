import { useState } from "react";
import { httpClient } from './HTTPClient';



export const useAlunos = () =>{





    const [productIdDelete, setProductIdDelete] = useState();



        const [stateAluno, setStateAluno] = useState({
            codigo: 0,
            nomeAluno: ""
        });

         const [stateAlunos, setStateAlunos] = useState({
                alunos: []
            });

        const excluirAluno = () => {
            
                // if (!window.confirm(`Deseja excluir: "${productIdDelete}"?`)) {
                //     return;
                // }
        
                let p = httpClient().delete("Aluno/Excluir?id=" + productIdDelete);
        
                p.then(r => {
                    return r;
                })
                .then(r => {
                    if(r.ok)
                    {
                        let alunos = stateAlunos.alunos;
                        let posicao = alunos.findIndex((f) => f.id == productIdDelete);
                        alunos.splice(posicao, 1);
                        
                        setStateAlunos({
                            alunos
                        });
                        setProductIdDelete(undefined);
                        
                    }
                    else
                        alert("não é possível excluir um aluno vinculado a uma disciplina!");
                })
                .catch((error) => {
                    alert("Deu erro"+error);
                     setProductIdDelete(undefined);
                })
               
            }

            
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

      
    const handleCloseModalDelete = () => {
            setProductIdDelete(undefined);
    }

      const handleOpenModalDelete = (productId) => {
            setProductIdDelete(productId);
    }


    return {
        openModalDelete: !!productIdDelete,
        excluirAluno,
        stateAlunos,
        handleCloseModalDelete,
        stateAluno,
        handleOpenModalDelete,
        obterAlunosPorNome
    }
}

