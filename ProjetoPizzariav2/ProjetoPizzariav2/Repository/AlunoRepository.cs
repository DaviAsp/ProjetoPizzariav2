namespace ProjetoPizzariav2.Repository
{
    public class AlunoRepository
    {
        WrapperMySQL _mysql = new WrapperMySQL();

        public bool Salvar(Models.Aluno aluno)
        {
            bool sucesso = false;

            try
            {

                if (aluno.Id == 0)
                {
                    _mysql.Comando.CommandText = $@"insert into 
                                                     Aluno (Nome, Email, DataNascimento) 
                                                     values (@Nome, @Email, @DataNascimento)";
                }
                else
                {
                    _mysql.Comando.CommandText = @$"update Aluno 
                                                     set Nome = @Nome, Email = @Email, DataNascimento = @DataNascimento
                                                     where AlunoId = @AlunoId";

                    _mysql.Comando.Parameters.AddWithValue("@AlunoId", aluno.Id);
                }

                _mysql.Comando.Parameters.AddWithValue("@Nome", aluno.Nome);
                _mysql.Comando.Parameters.AddWithValue("@Email", aluno.Email);
                _mysql.Comando.Parameters.AddWithValue("@DataNascimento", aluno.DataNascimento);

                _mysql.Abrir();
                int linhasAfetadas = _mysql.Comando.ExecuteNonQuery();

                sucesso = linhasAfetadas > 0;

                if (sucesso)
                {
                    if (aluno.Id == 0)
                    {
                        aluno.Id = (int)_mysql.Comando.LastInsertedId;
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

        public bool Excluir(int id)
        {
            bool sucesso = false;

            try
            {

                _mysql.Comando.CommandText = @$"delete from Aluno where AlunoId = {id}";

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

        public Models.Aluno Obter(int id)
        {
            Models.Aluno aluno = null;

            try
            {

                _mysql.Comando.CommandText = $@"select * 
                                                from Aluno
                                                where AlunoId = {id}";

                _mysql.Abrir();
                var dr = _mysql.Comando.ExecuteReader();

                if (dr.Read())
                {
                    aluno = new Models.Aluno();
                    aluno.Id = Convert.ToInt32(dr["AlunoId"]);
                    aluno.Nome = dr["Nome"].ToString();
                    aluno.Email = dr["Email"].ToString();
                    aluno.DataNascimento = Convert.ToDateTime(dr["DataNascimento"]);
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

            return aluno;

        }


        public List<Models.Aluno> ConsultarPorNome(string nome)
        {
            List<Models.Aluno> alunos = new List<Models.Aluno>();

            try
            {
                _mysql.Comando.CommandText = $@"select * 
                                                from Aluno
                                                where Nome like @Nome";

                _mysql.Comando.Parameters.AddWithValue("@Nome", nome + "%");

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
