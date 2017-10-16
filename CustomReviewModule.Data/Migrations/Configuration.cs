using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CustomReviewModule.Data.Model;
using CustomReviewModule.Data.Repository;

namespace CustomReviewModule.Data.Migration
{

    public sealed class Configuration : DbMigrationsConfiguration<ReviewRepository>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Migrations";
        }

        protected override void Seed(ReviewRepository context)
        {
            Review testReview = new Review
            {
                Author = "Николай Прохоров",
                CreatedDate = DateTime.UtcNow,
                ProductId = "198d4ad4d5be42aea8d9546885a3bd99",
                Text = "Первый отзыв",
                Rate = 5
            };

            if (!context.Reviews.Any())
            {
                context.Add<Review>(testReview);
            }

        }
    }
}
