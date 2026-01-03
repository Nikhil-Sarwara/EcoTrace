using EcoTrace.Api;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using EcoTrace.Data;
using EcoTrace.Core;
using EcoTrace.Core.Interfaces;
using EcoTrace.Core.Services;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add this line with your other services
builder.Services.AddScoped<ICarbonService, CarbonService>();
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
app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new { Error = "An unexpected error occurred. Please try again later." });
    });
});

app.UseCors( policy => 
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
);

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();