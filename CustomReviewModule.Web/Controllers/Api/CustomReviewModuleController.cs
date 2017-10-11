using System.Web.Http;

namespace CustomReviewModule.Web.Controllers.Api
{
    [RoutePrefix("")]
    public class CustomReviewModuleController : ApiController
    {
        // GET: api/managedModule
        [HttpGet]
        [Route("api/customreview/test")]
        public IHttpActionResult Get()
        {
            return Ok(new { result = "Hello world!" });
        }
    }
}
