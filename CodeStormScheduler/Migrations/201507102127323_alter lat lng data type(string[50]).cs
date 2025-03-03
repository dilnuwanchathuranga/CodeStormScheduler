namespace CodeStormScheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alterlatlngdatatypestring50 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.EventDetails", "Longitude", c => c.String(maxLength: 50));
            AlterColumn("dbo.EventDetails", "Latitude", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.EventDetails", "Latitude", c => c.String(maxLength: 10));
            AlterColumn("dbo.EventDetails", "Longitude", c => c.String(maxLength: 10));
        }
    }
}
