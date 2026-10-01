using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Casalia.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Acabados",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    UrlTextura = table.Column<string>(type: "text", nullable: true),
                    Color = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acabados", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    FechaRegistro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProveedorAuth = table.Column<string>(type: "text", nullable: false),
                    Rol = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Disenos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Descripcion = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Presupuesto = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    AutorId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disenos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Disenos_Usuarios_AutorId",
                        column: x => x.AutorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Modelos3D",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Origen = table.Column<string>(type: "text", nullable: false),
                    AnchoReal = table.Column<double>(type: "double precision", nullable: false),
                    AltoReal = table.Column<double>(type: "double precision", nullable: false),
                    ProfundidadReal = table.Column<double>(type: "double precision", nullable: false),
                    CreadorId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modelos3D", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modelos3D_Usuarios_CreadorId",
                        column: x => x.CreadorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ambientes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Altura = table.Column<double>(type: "double precision", nullable: false),
                    DisenoId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambientes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ambientes_Disenos_DisenoId",
                        column: x => x.DisenoId,
                        principalTable: "Disenos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElementosEnDiseno",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PosicionX = table.Column<double>(type: "double precision", nullable: false),
                    PosicionY = table.Column<double>(type: "double precision", nullable: false),
                    PosicionZ = table.Column<double>(type: "double precision", nullable: false),
                    Rotacion = table.Column<double>(type: "double precision", nullable: false),
                    Escala = table.Column<double>(type: "double precision", nullable: false),
                    DisenoId = table.Column<long>(type: "bigint", nullable: false),
                    ModeloId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementosEnDiseno", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElementosEnDiseno_Disenos_DisenoId",
                        column: x => x.DisenoId,
                        principalTable: "Disenos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElementosEnDiseno_Modelos3D_ModeloId",
                        column: x => x.ModeloId,
                        principalTable: "Modelos3D",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Superficies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AmbienteId = table.Column<long>(type: "bigint", nullable: false),
                    AcabadoId = table.Column<long>(type: "bigint", nullable: true),
                    Tipo = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    PuntoInicioX = table.Column<double>(type: "double precision", nullable: true),
                    PuntoInicioZ = table.Column<double>(type: "double precision", nullable: true),
                    PuntoFinX = table.Column<double>(type: "double precision", nullable: true),
                    PuntoFinZ = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Superficies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Superficies_Acabados_AcabadoId",
                        column: x => x.AcabadoId,
                        principalTable: "Acabados",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Superficies_Ambientes_AmbienteId",
                        column: x => x.AmbienteId,
                        principalTable: "Ambientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Aberturas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    U = table.Column<double>(type: "double precision", nullable: false),
                    V = table.Column<double>(type: "double precision", nullable: false),
                    Ancho = table.Column<double>(type: "double precision", nullable: false),
                    Alto = table.Column<double>(type: "double precision", nullable: false),
                    Tipo = table.Column<string>(type: "text", nullable: false),
                    SuperficieId = table.Column<long>(type: "bigint", nullable: false),
                    ModeloId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aberturas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Aberturas_Modelos3D_ModeloId",
                        column: x => x.ModeloId,
                        principalTable: "Modelos3D",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Aberturas_Superficies_SuperficieId",
                        column: x => x.SuperficieId,
                        principalTable: "Superficies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aberturas_ModeloId",
                table: "Aberturas",
                column: "ModeloId");

            migrationBuilder.CreateIndex(
                name: "IX_Aberturas_SuperficieId",
                table: "Aberturas",
                column: "SuperficieId");

            migrationBuilder.CreateIndex(
                name: "IX_Ambientes_DisenoId",
                table: "Ambientes",
                column: "DisenoId");

            migrationBuilder.CreateIndex(
                name: "IX_Disenos_AutorId",
                table: "Disenos",
                column: "AutorId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementosEnDiseno_DisenoId",
                table: "ElementosEnDiseno",
                column: "DisenoId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementosEnDiseno_ModeloId",
                table: "ElementosEnDiseno",
                column: "ModeloId");

            migrationBuilder.CreateIndex(
                name: "IX_Modelos3D_CreadorId",
                table: "Modelos3D",
                column: "CreadorId");

            migrationBuilder.CreateIndex(
                name: "IX_Superficies_AcabadoId",
                table: "Superficies",
                column: "AcabadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Superficies_AmbienteId",
                table: "Superficies",
                column: "AmbienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Email",
                table: "Usuarios",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aberturas");

            migrationBuilder.DropTable(
                name: "ElementosEnDiseno");

            migrationBuilder.DropTable(
                name: "Superficies");

            migrationBuilder.DropTable(
                name: "Modelos3D");

            migrationBuilder.DropTable(
                name: "Acabados");

            migrationBuilder.DropTable(
                name: "Ambientes");

            migrationBuilder.DropTable(
                name: "Disenos");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
