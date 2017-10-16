using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CustomReviewModule.Data.Model;

namespace CustomReviewModule.Data.Infrastructure
{
    public class ReviewResult<T> where T : Review
    {
        public ReviewResult()
        {
        }

        public int TotalCount { get; set; }
        public List<T> Result { get; set; }
    }
}
