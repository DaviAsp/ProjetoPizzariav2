using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ProjetoPizzariav2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        [HttpPost]
        [Route("[action]")]
        public IActionResult Gravar(ViewModel.AlunoGravarViewModel alunoVM)
        {

            Models.Aluno aluno = new Models.Aluno();
            aluno.Id = alunoVM.Id;
            aluno.Nome = alunoVM.Nome;
            aluno.DataNascimento = alunoVM.DataNascimento;
            aluno.Email = alunoVM.Email;

            Services.AlunoService alunoServices =
                new Services.AlunoService();

            var operacao = alunoServices.Gravar(aluno);

            if (operacao)
            {

                return Ok(ValidationResult.Sucesso("Deu certo"));
            }
            else return BadRequest("Deu erro");

        }


        [HttpGet]
        [Route("[action]")]
        public IActionResult Obter(int id)
        {
            Services.AlunoService alunoServices =
                new Services.AlunoService();

            Models.Aluno aluno = alunoServices.Obter(id);

            if (aluno == null)
            {
                return NotFound("Aluno não encontrado.");
            }
            else
            {
                ViewModel.AlunoObterViewModel alunoVM = new ViewModel.AlunoObterViewModel();
                alunoVM.Id = aluno.Id;
                alunoVM.Nome = aluno.Nome;
                alunoVM.DataNascimento = aluno.DataNascimento;
                alunoVM.Email = aluno.Email;

                return Ok(alunoVM);
            }

        }


        [HttpDelete]
        [Route("[action]")]
        public IActionResult Excluir(int id)
        {
            Services.AlunoService alunoServices =
                new Services.AlunoService();

            if (alunoServices.Excluir(id))
                return Ok();
            else return BadRequest();
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult ObterPorNome(string nome)
        {
            Services.AlunoService alunoServices =
                new Services.AlunoService();

            var alunos = alunoServices.ConsultarPorNome(nome);

            if (!alunos.Any())
            {
                return NotFound("Alunos encontrados.");
            }
            else
            {
                List<ViewModel.AlunoObterViewModel> retorno = new();

                foreach (var aluno in alunos)
                {
                    ViewModel.AlunoObterViewModel alunoVM = new ViewModel.AlunoObterViewModel();
                    alunoVM.Id = aluno.Id;
                    alunoVM.Nome = aluno.Nome;
                    alunoVM.DataNascimento = aluno.DataNascimento;
                    alunoVM.Email = aluno.Email;
                    retorno.Add(alunoVM);
                }
                return Ok(retorno);
            }

        }
    }
}
