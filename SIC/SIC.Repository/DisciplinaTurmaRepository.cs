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
                                                                      t.IdTurma
                                                                    , t.Identificador as IdentificadorTurma
                                                                    FROM DisciplinaTurma dt
                                                                    INNER JOIN Turma t
                                                                    ON dt.IdTurma = t.IdTurma
                                                                    WHERE IdProfessor = @IdProfessor";

        private const string QUERY_LISTAR_HORARIOS_POR_TURMA = @"SELECT 
                                                                   HorarioInicio as HorarioInicioDiscplina
                                                                 , HorarioFinal as HorarioFinalDisciplina
                                                                 , CONVERT(VARCHAR(10), HorarioInicio , 108) + ' - ' + CONVERT(VARCHAR(10), HorarioFinal, 108) as Horario
                                                                FROM DisciplinaTurma 
                                                                WHERE 
                                                                   IdTurma = @IdTurma
                                                                GROUP BY 
                                                                   HorarioInicio
                                                                 , HorarioFinal";

        private const string QUERY_LISTAR_ALUNOS_POR_TURMA_HORARIO = @"SELECT 
                                                                           a.RegistroAcademico as RA
                                                                         , a.Nome as NomeAluno
                                                                         , dt.IdDisciplinaTurma
                                                                        FROM DisciplinaTurma dt
                                                                        INNER JOIN Disciplina d
                                                                        ON dt.IdDisciplina = d.IdDisciplina
                                                                        INNER JOIN AlunoMatriculado am
                                                                        ON dt.IdDisciplinaTurma = am.IdDisciplinaTurma
                                                                        INNER JOIN Aluno a
                                                                        ON am.RegistroAcademico = a.RegistroAcademico
                                                                        WHERE 
	                                                                        dt.IdTurma = @IdTurma AND
	                                                                        dt.HorarioInicio = CONVERT(TIME,@HorarioInicial,108) AND
	                                                                        dt.HorarioFinal = CONVERT(TIME,@HorarioFinal,108) 
                                                                        GROUP BY 
                                                                           a.RegistroAcademico
                                                                         , a.Nome 
                                                                         , dt.IdDisciplinaTurma";
        #endregion

        #region [ Consultas ] 

        public List<TurmaDTO> ListarTurmasPorProfessor(int idProfessor)
        {
            var param = new { IdProfessor = idProfessor };
            return DapperHelper.List<TurmaDTO>(QUERY_LISTAR_TURMAS_POR_PROFESSOR, param);
        }

        public List<HorarioDTO> ListarHorariosPorTurma(int idTurma, string horarioInicial, string horarioFinal)
        {
            var param = new { IdTurma = idTurma };
            return DapperHelper.List<HorarioDTO>(QUERY_LISTAR_HORARIOS_POR_TURMA, param);
        }

        public List<AlunoTurmaDTO> ListarAlunosPorTurmaHorario(int idTurma, string horarioInicial, string horarioFinal)
        {
            var param = new { IdTurma = idTurma, HorarioInicial = horarioInicial, HorarioFinal = horarioFinal };
            return DapperHelper.List<AlunoTurmaDTO>(QUERY_LISTAR_ALUNOS_POR_TURMA_HORARIO, param);
        }

        #endregion
    }
}
