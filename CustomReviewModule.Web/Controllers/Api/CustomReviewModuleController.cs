using System;
using System.Collections;
using System.Web.Http;
using System.Web.Http.Description;
using CustomReviewModule.Data.Model;
using System.Collections.Generic;
using CustomReviewModule.Data.Infrastructure;

namespace CustomReviewModule.Web.Controllers.Api
{
    [RoutePrefix("")]
    public class CustomReviewModuleController : ApiController
    {

        [HttpPost]
        [ResponseType(typeof(Review))]
        [Route("api/review/product")]
        public IHttpActionResult NewReview(Review newReview)
        {
            return Ok(newReview);
        }

        [HttpGet]
        [Route("api/review/{id}/product")]
        public IHttpActionResult GetReviewById(string id)
        {
            //var result = new Review { Author = "Николай", Rate=3, Text ="Хороший отзыв"};
            var result = new { Count = 100, Text = "Отзывов", requestId = id };
            return Ok(result);
        }

        [HttpGet]
        [ResponseType(typeof(ReviewResult<Review>))]
        [Route("api/review/reviewlist/{id}/product")]
        public IHttpActionResult GetReviewListForProduct(string id)
        {
            List<Review> reviewList = new List<Review>();
            Review r1 = new Review { Author = "Вася", Rate = 3, Text = "Хороший продукт", ProductId = id };
            Review r2 = new Review { Author = "Коля", Rate = 4, Text = "Отличный продукт продукт", ProductId = id };
            reviewList.Add(r1);
            reviewList.Add(r2);

            return Ok(new ReviewResult<Review> { TotalCount = reviewList.Count, Result = reviewList });
        }
    }
}
