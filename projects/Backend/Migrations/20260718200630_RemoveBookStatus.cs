using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveBookStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "VolumeSets");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Books");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "VolumeSets",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "VolumeSets");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "VolumeSets",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Books",
                type: "longtext",
                nullable: false);
        }
    }
}
