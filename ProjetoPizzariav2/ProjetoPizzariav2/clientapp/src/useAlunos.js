import { useState } from "react";
import { httpClient } from './HTTPClient';



export const useAlunos = () =>{

 const [modal, setModal] = useState();



    const [productIdDelete, setProductIdDelete] = useState();



        const [stateAluno, setStateAluno] = useState({
            codigo: 0,
            nomeAluno: ""
        });

         const [stateAlunos, setStateAlunos] = useState({
                alunos: []
            });

        const excluirAluno = () => {
            
                if (!window.confirm(`Deseja excluir: "${productIdDelete}"?`)) {
                    return;
                }
        
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
                    }
                    else
                        alert("não é possível excluir um aluno vinculado a uma disciplina!");
                })
                .catch((error) => {
                    alert("Deu erro"+error);
                })
            }



    return {
        openModalDelete: !!productIdDelete,
        excluirAluno,
        stateAlunos
    }
}

