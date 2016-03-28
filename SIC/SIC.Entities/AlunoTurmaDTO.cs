using System;

namespace SIC.DTO
{
    [Serializable]
    public class AlunoTurmaDTO
    {
        public int RA { get; set; }
        public string NomeAluno { get; set; }
        public int IdDisciplinaTurma { get; set; }
    }
}
