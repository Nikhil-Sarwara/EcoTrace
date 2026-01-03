using EcoTrace.Api;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using EcoTrace.Data;
using EcoTrace.Core;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<EcoTrace.Data.EcoTraceDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// NEW: This is required for .NET 9+
builder.Services.AddOpenApi(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // These two enable the Swagger UI
    app.UseSwagger();
    app.UseSwaggerUI();
    
    // Optional: This enables the new .NET 9 native OpenAPI document
    app.MapOpenApi(); 
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();