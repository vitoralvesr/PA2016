using SIC.Business.Interfaces;
using SIC.DTO;
using SIC.Repository.Interfaces;
using System.Collections.Generic;

namespace SIC.Business
{
    public class DisciplinaTurmaBusiness : IDisciplinaTurmaBusiness
    {
        #region [ Propriedades ]

        public IDisciplinaTurmaRepository _disciplinaTurmaRepository { get; set; }

        #endregion

        #region [ Construtor ]
        
        public DisciplinaTurmaBusiness(IDisciplinaTurmaRepository disciplinaTurmaRepository)
        {
            _disciplinaTurmaRepository = disciplinaTurmaRepository;
        }

        #endregion

        #region [ Métodos ]

        public List<TurmaDTO> ListarTurmasPorProfessor(int codProfessor)
        {
            return _disciplinaTurmaRepository.ListarTurmasPorProfessor(codProfessor);
        }

        public List<HorarioDTO> ListarHorariosPorTurma(int codTurma, string horarioInicial, string horarioFinal)
        {
            return _disciplinaTurmaRepository.ListarHorariosPorTurma(codTurma, horarioInicial, horarioFinal);
        }

        public List<AlunoTurmaDTO> ListarAlunosPorTurmaHorario(int codTurma, string horarioInicial, string horarioFinal)
        {
            return _disciplinaTurmaRepository.ListarAlunosPorTurmaHorario(codTurma, horarioInicial, horarioFinal);
        }

        #endregion
    }
}
