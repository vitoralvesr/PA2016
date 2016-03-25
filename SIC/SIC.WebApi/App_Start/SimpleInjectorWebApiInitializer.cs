[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(SIC.WebApi2.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace SIC.WebApi2.App_Start
{
    using System.Web.Http;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;
    using IoC.SimpleInjector;

    public static class SimpleInjectorWebApiInitializer
    {
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
            ContainerConfiguration.InitializeContainer(container);
        }
    }
}