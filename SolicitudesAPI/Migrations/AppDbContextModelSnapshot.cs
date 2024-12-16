﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SolicitudesAPI.Data;

#nullable disable

namespace SolicitudesAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("SolicitudesAPI.Models.Solicitud", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Activo")
                        .HasColumnType("boolean");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Solicitante")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("TipoSolicitudId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TipoSolicitudId");

                    b.ToTable("Solicitudes");
                });

            modelBuilder.Entity("SolicitudesAPI.Models.TipoSolicitud", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Activo")
                        .HasColumnType("boolean");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TiposSolicitudes");
                });

            modelBuilder.Entity("SolicitudesAPI.Models.Solicitud", b =>
                {
                    b.HasOne("SolicitudesAPI.Models.TipoSolicitud", "TipoSolicitud")
                        .WithMany()
                        .HasForeignKey("TipoSolicitudId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TipoSolicitud");
                });
#pragma warning restore 612, 618
        }
    }
}
