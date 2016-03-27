using SIC.DTO;
using SIC.Repository.Dapper;
using SIC.Repository.Interfaces;
using System.Collections.Generic;

namespace SIC.Repository
{
    public class DisciplinaTurmaRepository : IDisciplinaTurmaRepository
    {
        #region [ Propriedades ]

        private const string QUERY_LISTAR_TURMAS_POR_PROFESSOR = @"SELECT 
                                                                    t.Codigo as CodTurma
                                                                  , t.Identificador as IdentificadorTurma
                                                                    FROM Disciplina_Turma dt
                                                                    INNER JOIN Turma t
                                                                    ON dt.CodTurma = t.Codigo
                                                                    WHERE CodProfessor = @CodProfessor";

        private const string QUERY_LISTAR_HORARIOS_POR_TURMA = @"SELECT
                                                                   HorarioInicio as HorarioInicioDiscplina
                                                                 , HorarioFinal as HorarioFinalDisciplina
                                                                 , CONVERT(VARCHAR(10), HorarioInicio , 108) + ' - ' + CONVERT(VARCHAR(10), HorarioFinal, 108) as Horario
                                                                FROM Disciplina_Turma
                                                                WHERE CodTurma = @CodTurma
                                                                GROUP BY
                                                                   HorarioInicio
                                                                 , HorarioFinal";

        private const string QUERY_LISTAR_ALUNOS_POR_TURMA_HORARIO = @"SELECT 
                                                                          a.RegistroAcademico as RA
                                                                        , a.Nome as NomeAluno
                                                                        , dt.Codigo as CodDisciplinaTurma
                                                                    FROM Disciplina_Turma dt
                                                                    INNER JOIN Disciplina d
                                                                    ON dt.CodDisciplina = d.Codigo
                                                                    INNER JOIN Aluno_Matriculado am
                                                                    ON dt.Codigo = am.CodDisciplinaTurma
                                                                    INNER JOIN Aluno a
                                                                    ON am.RegistroAcademico = a.RegistroAcademico
                                                                    WHERE 
	                                                                    dt.CodTurma = @CodTurma AND
	                                                                    dt.HorarioInicio = CONVERT(TIME,@HorarioInicial,108) AND
	                                                                    dt.HorarioFinal = CONVERT(TIME,@HorarioFinal,108) 
                                                                    GROUP BY 
                                                                        a.RegistroAcademico
                                                                        , a.Nome 
                                                                        , dt.Codigo";

        #endregion

        #region [ Consultas ] 

        public List<TurmaDTO> ListarTurmasPorProfessor(int codProfessor)
        {
            var param = new { CodProfessor = codProfessor };
            return DapperHelper.List<TurmaDTO>(QUERY_LISTAR_TURMAS_POR_PROFESSOR, param);
        }

        public List<HorarioDTO> ListarHorariosPorTurma(int codTurma, string horarioInicial, string horarioFinal)
        {
            var param = new { CodTurma = codTurma };
            return DapperHelper.List<HorarioDTO>(QUERY_LISTAR_HORARIOS_POR_TURMA, param);
        }

        public List<AlunoTurmaDTO> ListarAlunosPorTurmaHorario(int codTurma, string horarioInicial, string horarioFinal)
        {
            var param = new { CodTurma = codTurma, HorarioInicial = horarioInicial, HorarioFinal = horarioFinal };
            return DapperHelper.List<AlunoTurmaDTO>(QUERY_LISTAR_ALUNOS_POR_TURMA_HORARIO, param);
        }

        #endregion
    }
}
