using Microsoft.AspNetCore.Mvc;

namespace ProjetoPizzariav2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisciplinaController : Controller
    {
        //[HttpPost]
        //[Route("[action]")]
        //public IActionResult Gravar(ViewModel.DisciplinaGravarViewModel disciplinaVM)
        //{

        //    Models.Aluno aluno = new Models.Aluno();
        //    aluno.Id = alunoVM.Id;
        //    aluno.Nome = alunoVM.Nome;
        //    aluno.DataNascimento = alunoVM.DataNascimento;
        //    aluno.Email = alunoVM.Email;

        //    Services.AlunoService alunoServices =
        //        new Services.AlunoService();

        //    var operacao = alunoServices.Gravar(aluno);

        //    if (operacao)
        //    {

        //        return Ok(ValidationResult.Sucesso("Deu certo"));
        //    }
        //    else return BadRequest("Deu erro");

        //}

        [HttpPut]
        [Route("[action]")]
        public IActionResult Matricular(ViewModel.AlunoMatricularViewModel dados)
        {
            Services.DisciplinaService services = new();
            var sucesso = services.Matricular(dados.DisciplinaId, dados.AlunoId);
            if (sucesso)
                return Ok();
            else return BadRequest();
        }

        [HttpPut]
        [Route("[action]")]
        public IActionResult Desmatricular(ViewModel.AlunoMatricularViewModel dados)
        {
            Services.DisciplinaService services = new();
            var sucesso = services.Desmatricular(dados.DisciplinaId, dados.AlunoId);
            if (sucesso)
                return Ok();
            else return BadRequest();
        }


        [HttpGet]
        [Route("[action]")]
        public IActionResult ListarAlunos(int disciplinaId)
        {
            Services.DisciplinaService services = new();

            var alunos = services.ObterAlunos(disciplinaId);

            if (!alunos.Any())
            {
                return NotFound("Sem alunos.");
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
