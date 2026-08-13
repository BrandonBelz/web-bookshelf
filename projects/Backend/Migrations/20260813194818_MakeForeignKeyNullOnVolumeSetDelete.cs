using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MakeForeignKeyNullOnVolumeSetDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Volumes_VolumeSets_SetId",
                table: "Volumes");

            migrationBuilder.AddForeignKey(
                name: "FK_Volumes_VolumeSets_SetId",
                table: "Volumes",
                column: "SetId",
                principalTable: "VolumeSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Volumes_VolumeSets_SetId",
                table: "Volumes");

            migrationBuilder.AddForeignKey(
                name: "FK_Volumes_VolumeSets_SetId",
                table: "Volumes",
                column: "SetId",
                principalTable: "VolumeSets",
                principalColumn: "Id");
        }
    }
}
