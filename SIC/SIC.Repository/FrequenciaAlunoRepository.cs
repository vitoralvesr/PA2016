using SIC.Repository.Dapper;
using SIC.Repository.Interfaces;

namespace SIC.Repository
{
    public class Pessoa
    { }

    public class FrequenciaAlunoRepository : IFrequenciaAlunoRepository
    {
        public void RealizarChamada()
        {
            //TODO: Código exemplo.
            DapperHelper.Query<Pessoa>("select * from pessoa");

            var param = new { Id = 1, Nome = "Ivan" };
            DapperHelper.Get<Pessoa>("select * from pessoa where Id = @Id and Nome = @Nome", param);
        }
    }
}
