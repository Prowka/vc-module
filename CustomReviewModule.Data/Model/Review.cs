using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VirtoCommerce.Platform.Core.Common;

[assembly: CLSCompliant(true)]
namespace CustomReviewModule.Data.Model
{
    /// <summary>
    /// отзыв о продукте
    /// </summary>
    public class Review : AuditableEntity
    {
        public string Author { get; set; }
        public string Text { get; set; }
        public int Rate { get; set; }

        public bool Approved { get; set; }
        public string ProductId { get; set; }

    }
}
