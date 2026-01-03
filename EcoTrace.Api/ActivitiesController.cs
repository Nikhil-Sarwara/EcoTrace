using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrace.Core;
using EcoTrace.Core.DTOs;
using EcoTrace.Data;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarbonActivity>>> GetActivities()
    {
        return await _context.Activities
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<CarbonActivity>> CreateActivity(CreateActivityRequest request)
    {
        double total = _carbonService.Calculate(request.Category, request.Type, request.Quantity);

        var newActivity = new CarbonActivity
        {
            Category = request.Category,
            Name = request.Name,
            Type = request.Type,
            Quantity = request.Quantity,
            TotalCO2 = total,
            CreatedAt = DateTime.UtcNow
        };

        _context.Activities.Add(newActivity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetActivities), new { id = newActivity.Id }, newActivity);
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        // Fetch activities from DB
        var activities = await _context.Activities.ToListAsync();

        if (activities == null || !activities.Any())
        {
            return Ok(new { TotalEmissions = 0, TreeEquivalent = 0, Breakdown = new List<object>() });
        }

        // Perform calculations in memory to avoid SQL translation issues
        var totalEmissions = activities.Sum(a => a.TotalCO2);

        // 1 tree offsets ~20kg per year
        var treesOffset = Math.Ceiling(totalEmissions / 20);

        var breakdown = activities
            .GroupBy(a => a.Category)
            .Select(g => new
            {
                // Ensure the category name matches what the frontend expects
                Category = g.Key,
                Total = Math.Round(g.Sum(a => a.TotalCO2), 2)
            })
            .ToList();

        return Ok(new
        {
            TotalEmissions = Math.Round(totalEmissions, 2),
            TreeEquivalent = treesOffset,
            Breakdown = breakdown
        });
    }
}