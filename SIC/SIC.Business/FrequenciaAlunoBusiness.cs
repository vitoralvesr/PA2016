using SIC.Business.Interfaces;
using SIC.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIC.Business
{
    public class FrequenciaAlunoBusiness : IFrequenciaAlunoBusiness
    {
        #region [ Propriedades e Atributos ]

        private IFrequenciaAlunoRepository _frequenciaAlunoRepository;

        #endregion

        #region [ Construtor ]

        public FrequenciaAlunoBusiness(IFrequenciaAlunoRepository frequenciaAlunoRepository)
        {
            this._frequenciaAlunoRepository = frequenciaAlunoRepository;
            //teste
        }

        #endregion

        #region [ Métodos Públicos ]

        public void RealizarChamada()
        {
            _frequenciaAlunoRepository.RealizarChamada();
        }

        #endregion
    }
}
