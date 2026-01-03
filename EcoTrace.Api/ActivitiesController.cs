using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrace.Core;
using EcoTrace.Core.DTOs;
using EcoTrace.Data;
using EcoTrace.Core.Services;
using EcoTrace.Core.Interfaces;

namespace EcoTrace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly EcoTraceDbContext _context;
    private readonly ICarbonService _carbonService;

    public ActivitiesController(EcoTraceDbContext context, ICarbonService carbonService)
    {
        _context = context;
        _carbonService = carbonService;
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
        // Use injected carbon service
        double total = _carbonService.Calculate(request.Category, request.Quantity);

        var newActivity = new CarbonActivity
        {
            Category = request.Category,
            Quantity = request.Quantity,
            TotalCO2 = total,
            CreatedAt = DateTime.UtcNow
        };

        _context.Activities.Add(newActivity);
        await _context.SaveChangesAsync();

        return Ok(newActivity);
    }
}