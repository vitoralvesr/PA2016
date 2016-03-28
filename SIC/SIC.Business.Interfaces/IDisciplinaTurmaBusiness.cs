using SIC.DTO;
using System.Collections.Generic;

namespace SIC.Business.Interfaces
{
    public interface IDisciplinaTurmaBusiness
    {
        List<TurmaDTO> ListarTurmasPorProfessor(int codProfessor);
        List<HorarioDTO> ListarHorariosPorTurma(int codTurma, string horarioInicial, string horarioFinal);
        List<AlunoTurmaDTO> ListarAlunosPorTurmaHorario(int codTurma, string horarioInicial, string horarioFinal);
    }
}
