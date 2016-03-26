using System;

namespace SIC.DTO
{
    [Serializable]
    public class HorarioDTO
    {
        public TimeSpan HorarioInicioDiscplina { get; set; }
        public TimeSpan HorarioFinalDisciplina { get; set; }
        public string Horario { get; set; }
    }
}
