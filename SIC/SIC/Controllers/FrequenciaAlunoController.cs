using SIC.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SIC.WebApi.Controllers
{
    public class FrequenciaAlunoController : ApiController
    {
        #region [ Propriedades e Atributos ]

        private IFrequenciaAlunoBusiness _frequenciaAlunoBusiness;

        #endregion

        #region [ Construtor ]

        public FrequenciaAlunoController(IFrequenciaAlunoBusiness frequenciaAlunoBusiness)
        {
            this._frequenciaAlunoBusiness = frequenciaAlunoBusiness;
        }

        #endregion

        #region [ Ações ]

        // GET api/aluno
        public IEnumerable<string> Get()
        {
            _frequenciaAlunoBusiness.RealizarChamada();

            return new string[] { "value1", "value2" };
        }

        #endregion
    }
}
