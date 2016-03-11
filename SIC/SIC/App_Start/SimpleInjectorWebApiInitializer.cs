[assembly: WebActivator.PostApplicationStartMethod(typeof(SIC.WebApi.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace SIC.WebApi.App_Start
{
    using System.Web.Http;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;
    using SIC.Business.Interfaces;
    using SIC.Business;
    using SIC.Repository.Interfaces;
    using SIC.Repository;

    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>Initialize the container and register it as Web API Dependency Resolver.</summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }

        private static void InitializeContainer(Container container)
        {
            container.Register<IFrequenciaAlunoBusiness, FrequenciaAlunoBusiness>(Lifestyle.Scoped);
            container.Register<IFrequenciaAlunoRepository, FrequenciaAlunoRepository>(Lifestyle.Scoped);
        }
    }
}