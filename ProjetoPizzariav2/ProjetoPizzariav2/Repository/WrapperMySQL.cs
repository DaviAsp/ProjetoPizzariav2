using MySql.Data.MySqlClient;

namespace ProjetoPizzariav2.Repository
{
    public class WrapperMySQL
    {
        public MySqlConnection Conexao { get; set; }
        public MySqlCommand Comando { get; set; }

        public WrapperMySQL()
        {
           // string strCon = Environment.GetEnvironmentVariable("StringConexao");
              string strCon = "Server=127.0.0.1;Database=mydb2;Uid=root;Pwd=123456;";
            Conexao = new MySqlConnection(strCon);
            Comando = Conexao.CreateCommand();
        }

        public void Abrir()
        {
            if (Conexao.State != System.Data.ConnectionState.Open)
                Conexao.Open();
        }

        public void Fechar()
        {
            Conexao.Close();
        }
    }
}
