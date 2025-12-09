namespace ProjetoPizzariav2.Services
{
    public class DisciplinaService
    {
        Repository.DisciplinaRepository _disciplinaRepository = new Repository.DisciplinaRepository();
        public bool Gravar(Models.Disciplina disciplina)
        {
            return _disciplinaRepository.Salvar(disciplina);

        }

        public bool Matricular(int disciplinaId, int alunoId)
        {
            return _disciplinaRepository.Matricular(disciplinaId, alunoId);
        }

        public bool Desmatricular(int disciplinaId, int alunoId)
        {
            return _disciplinaRepository.Desmatricular(disciplinaId, alunoId);
        }

        public List<Models.Aluno> ObterAlunos(int disciplinaId)
        {
            return _disciplinaRepository.ObterAlunos(disciplinaId);
        }
    }
}
