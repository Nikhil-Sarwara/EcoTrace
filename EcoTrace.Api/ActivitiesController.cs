using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrace.Core;
using EcoTrace.Core.DTOs;
using EcoTrace.Data;

namespace EcoTrace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly EcoTraceDbContext _context;

    public ActivitiesController(EcoTraceDbContext context)
    {
        _context = context;
    }

    // 1. GET: api/activities (Fetch all logs)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarbonActivity>>> GetActivities()
    {
        return await _context.Activities.OrderByDescending(a => a.CreatedAt).ToListAsync();
    }

    // 2. POST: api/activities (Add a new log)
    [HttpPost]
    public async Task<ActionResult<CarbonActivity>> CreateActivity(CreateActivityRequest request)
    {
        // Use our Math Logic from EcoTrace.Core
        double calculatedCO2 = CarbonCalculator.Calculate(request.Category, request.Quantity);

        var newActivity = new CarbonActivity
        {
            Category = request.Category,
            Quantity = request.Quantity,
            TotalCO2 = calculatedCO2,
            CreatedAt = DateTime.UtcNow
        };

        _context.Activities.Add(newActivity);
        await _context.SaveChangesAsync();

        return Ok(newActivity);
    }
}