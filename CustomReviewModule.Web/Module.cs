using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.Practices.Unity;
using VirtoCommerce.Platform.Core.ExportImport;
using VirtoCommerce.Platform.Core.Modularity;
using VirtoCommerce.Platform.Core.Security;
using VirtoCommerce.Platform.Core.Settings;
using VirtoCommerce.Platform.Data.Infrastructure;
using VirtoCommerce.Platform.Data.Infrastructure.Interceptors;
using VirtoCommerce.Platform.Data.Repositories;

using CustomReviewModule.Data.Repository;
using CustomReviewModule.Data.Migration;
using CustomReviewModule.Data.Model;

namespace CustomReviewModule.Web
{
    public class Module : ModuleBase
    {
        private const string _connectionStringName = "VirtoCommerce";
        private readonly IUnityContainer _container;

        public Module(IUnityContainer container)
        {
            _container = container;
        }

        public override void SetupDatabase()
        {
            //using (var context = new ReviewRepository(_connectionStringName, _container.Resolve<AuditableInterceptor>()))
            //{
            //    var initializer = new SetupDatabaseInitializer<ReviewRepository, Configuration>();
            //    initializer.InitializeDatabase(context);
            //}
        }

        public override void Initialize()
        {
            //_container.RegisterType<IReviewRepository>(new InjectionFactory(c => new ReviewRepository(_connectionStringName, new EntityPrimaryKeyGeneratorInterceptor())));
        }

        public override void PostInitialize()
        {
            base.PostInitialize();

            // This method is called for each installed module on the second stage of initialization.

            // Register implementations 
            // _container.RegisterType<IMyService, MyService>();

            // Resolve registered implementations:
            // var settingManager = _container.Resolve<ISettingsManager>();
            // var value = settingManager.GetValue("Pricing.ExportImport.Description", string.Empty);
        }
    }
}
