using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CustomReviewModule.Data.Model;
using VirtoCommerce.Platform.Core.Common;
using VirtoCommerce.Platform.Data.Infrastructure;
using VirtoCommerce.Platform.Data.Infrastructure.Interceptors;

namespace CustomReviewModule.Data.Repository
{
    public class ReviewRepository : EFRepositoryBase, IReviewRepository
    {
        public ReviewRepository()
        {
        }

        public ReviewRepository(string nameOrConnectionString, params IInterceptor[] interceptors)
            : base(nameOrConnectionString, null, interceptors)
        {
            Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Review>().HasKey(x => x.Id).Property(x => x.Id);
            modelBuilder.Entity<Review>().ToTable("Review");
            base.OnModelCreating(modelBuilder);
        }

        public IQueryable<Review> Reviews
        {
            get { return GetAsQueryable<Review>(); }
        }

        public Review GetReviewById( string id)
        {
            return Reviews.FirstOrDefault(x => x.Id == id);
        }
    }
}
