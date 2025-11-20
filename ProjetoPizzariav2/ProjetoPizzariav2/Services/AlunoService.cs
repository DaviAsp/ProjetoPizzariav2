namespace ProjetoPizzariav2.Services
{
    public class AlunoService
    {
        Repository.AlunoRepository _alunoRepository = new Repository.AlunoRepository();
        public bool Gravar(Models.Aluno aluno)
        {
            return _alunoRepository.Salvar(aluno);

        }

        public Models.Aluno Obter(int id)
        {
            return _alunoRepository.Obter(id);

        }

        public bool Excluir(int id)
        {
            return _alunoRepository.Excluir(id);

        }

        public List<Models.Aluno> ConsultarPorNome(string nome)
        {
            return _alunoRepository.ConsultarPorNome(nome);
        }
    }
}
