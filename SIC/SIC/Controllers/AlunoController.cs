using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SIC.WebApi.Controllers
{
    public class AlunoController : ApiController
    {
        // GET api/aluno
        public IEnumerable<string> Get()
        {
            //TODO: a implementar.
            return new string[] { "value1", "value2" };
        }
    }
}
