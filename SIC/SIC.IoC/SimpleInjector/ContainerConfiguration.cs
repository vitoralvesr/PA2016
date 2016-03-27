using SIC.Business;
using SIC.Business.Interfaces;
using SIC.Repository;
using SIC.Repository.Interfaces;
using SimpleInjector;

namespace SIC.IoC.SimpleInjector
{
    public static class ContainerConfiguration
    {
        public static void InitializeContainer(Container container)
        {
            #region [ Business ]

            container.Register<IFrequenciaAlunoBusiness, FrequenciaAlunoBusiness>(Lifestyle.Scoped);

            #endregion

            #region [ Repository ]

            container.Register<IFrequenciaAlunoRepository, FrequenciaAlunoRepository>(Lifestyle.Scoped);

            #endregion
        }
    }
}
