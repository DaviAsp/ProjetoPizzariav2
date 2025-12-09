namespace ProjetoPizzariav2.Repository
{
    public class DisciplinaRepository
    {
        WrapperMySQL _mysql = new WrapperMySQL();

        public bool Salvar(Models.Disciplina disciplina)
        {
            bool sucesso = false;

            try
            {

                if (disciplina.Id == 0)
                {
                    _mysql.Comando.CommandText = $@"insert into 
                                                     Disciplina (Nome, Ano, Semestre) 
                                                     values (@Nome, @Ano, @Semestre)";
                }
                else
                {
                    _mysql.Comando.CommandText = @$"update Disciplina 
                                                     set Nome = @Nome, Ano = @Ano, Semestre = @Semestre
                                                     where DisciplinaId = @DisciplinaId";

                    _mysql.Comando.Parameters.AddWithValue("@DisciplinaId", disciplina.Id);
                }

                _mysql.Comando.Parameters.AddWithValue("@Nome", disciplina.Nome);
                _mysql.Comando.Parameters.AddWithValue("@Ano", disciplina.Ano);
                _mysql.Comando.Parameters.AddWithValue("@Semestre", disciplina.Semestre);

                _mysql.Abrir();
                int linhasAfetadas = _mysql.Comando.ExecuteNonQuery();

                sucesso = linhasAfetadas > 0;

                if (sucesso)
                {
                    if (disciplina.Id == 0)
                    {
                        disciplina.Id = (int)_mysql.Comando.LastInsertedId;
                    }
                }

            }
            catch (Exception ex)
            {
                //ex.Message
            }
            finally
            {
                _mysql.Fechar();
            }

            return sucesso;

        }

        public bool Matricular(int disciplinaId, int alunoId)
        {
            bool sucesso = false;

            try
            {

                _mysql.Comando.CommandText = @$"insert into DisciplinaAluno (AlunoId, DisciplinaId)
                                                values ({alunoId}, {disciplinaId})";

                _mysql.Abrir();
                int linhasAfetadas = _mysql.Comando.ExecuteNonQuery();

                sucesso = linhasAfetadas > 0;

            }
            catch (Exception ex)
            {
                //ex.Message
            }
            finally
            {
                _mysql.Fechar();
            }

            return sucesso;

        }

        public bool Desmatricular(int disciplinaId, int alunoId)
        {
            bool sucesso = false;

            try
            {

                _mysql.Comando.CommandText = @$"delete from DisciplinaAluno
                                                where AlunoId = {alunoId} and DisciplinaId = {disciplinaId}";

                _mysql.Abrir();
                int linhasAfetadas = _mysql.Comando.ExecuteNonQuery();

                sucesso = linhasAfetadas > 0;

            }
            catch (Exception ex)
            {
                //ex.Message
            }
            finally
            {
                _mysql.Fechar();
            }

            return sucesso;

        }

        public List<Models.Aluno> ObterAlunos(int disciplinaId)
        {
            List<Models.Aluno> alunos = new List<Models.Aluno>();

            try
            {
                _mysql.Comando.CommandText = $@"select a.* 
                                                from Aluno a
                                                     inner join DisciplinaAluno d on a.AlunoId = d.AlunoId
                                                where d.DisciplinaId = {disciplinaId}";

                _mysql.Abrir();
                var dr = _mysql.Comando.ExecuteReader();

                while (dr.Read())
                {
                    Models.Aluno a = new();
                    a.Id = Convert.ToInt32(dr["AlunoId"]);
                    a.Nome = dr["Nome"].ToString();
                    a.Email = dr["Email"].ToString();
                    a.DataNascimento = Convert.ToDateTime(dr["DataNascimento"]);

                    alunos.Add(a);
                }
            }
            catch (Exception ex)
            {
                //ex.Message
            }
            finally
            {
                _mysql.Fechar();
            }

            return alunos;

        }
    }
}
