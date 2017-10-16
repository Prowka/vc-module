using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CustomReviewModule.Data.Model;
using VirtoCommerce.Platform.Core.Common;

namespace CustomReviewModule.Data.Repository
{
    public interface IReviewRepository : IRepository
    {
        IQueryable<Review> Reviews { get; }
        Review GetReviewById(string id);

    }
}
