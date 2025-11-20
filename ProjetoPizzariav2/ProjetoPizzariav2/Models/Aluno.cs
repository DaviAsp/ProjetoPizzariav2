namespace ProjetoPizzariav2.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }

        public Aluno()
        {

        }

        public int ObterIdade()
        {
            return DateTime.Now.Year - DataNascimento.Year;
        }
    }
}
