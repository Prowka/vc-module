using System;
using System.Collections;
using System.Web.Http;
using System.Web.Http.Description;
using CustomReviewModule.Data.Model;
using System.Collections.Generic;
using System.Net;
using CustomReviewModule.Data.Infrastructure;

namespace CustomReviewModule.Web.Controllers.Api
{
    [RoutePrefix("")]
    public class CustomReviewModuleController : ApiController
    {

        [HttpGet]
        [ResponseType(typeof(Review))]
        [Route("api/review/{id}")]
        public IHttpActionResult NewReview(string id)
        {
            Review r1 = new Review { Author = "Иванов Иван", Rate = 3, Text = "Хороший продукт", ProductId = id, Approved = true };
            return Ok(r1);
        }

        [HttpGet]
        [Route("api/review/{id}/product")]
        public IHttpActionResult GetReviewById(string id)
        {
            var result = new { Count = 100, Text = "Отзывов", requestId = id };
            return Ok(result);
        }

        [HttpGet]
        [ResponseType(typeof(ReviewResult<Review>))]
        [Route("api/review/reviewlist/{productId}/product")]
        public IHttpActionResult GetReviewListForProduct(string productId)
        {
            List<Review> reviewList = new List<Review>();
            Review r1 = new Review { Id = "23423sdfsedfw", Author = "Иванов Антон", Rate = 3, Text = "Хороший продукт", ProductId = productId, Approved= true, CreatedDate = DateTime.UtcNow };
            Review r2 = new Review { Id = "234sdf2345233",  Author = "Прохоров Николай", Rate = 4, Text = "Ну очень хороший бродукт", ProductId = productId, Approved = false, CreatedDate = DateTime.UtcNow.AddDays(-1) };
            reviewList.Add(r1);
            reviewList.Add(r2);

            return Ok(new ReviewResult<Review> { TotalCount = reviewList.Count, Result = reviewList });
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/review/product")]
        public IHttpActionResult UpdateReview(Review review)
        {
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpDelete]
        [ResponseType(typeof(void))]
        [Route("api/review/product")]
        public IHttpActionResult DeleteReviewList([FromUri] string[] ids)
        {
            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
