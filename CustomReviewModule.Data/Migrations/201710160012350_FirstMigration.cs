namespace CustomReviewModule.Data.Migration
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class FistMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Reviews",
                c => new
                {
                    Id = c.String(nullable: false, maxLength: 128),
                    Author = c.String(nullable: false, maxLength: 128),
                    Text = c.String(nullable: false, maxLength: 128),
                    Rate = c.Int(nullable: false),
                    Approved = c.Boolean(nullable: false),
                    ProductId = c.String(),
                    CreatedDate = c.DateTime(nullable: false),
                    ModifiedDate = c.DateTime(),
                    CreatedBy = c.String(maxLength: 64),
                    ModifiedBy = c.String(maxLength: 64),
                })
                .PrimaryKey(t => t.Id);

        }

        public override void Down()
        {
            DropTable("dbo.Reviews");
        }
    }
}
