using Microsoft.Extensions.Configuration;
using EcoTrace.Core.Interfaces;

namespace EcoTrace.Core.Services;

public class CarbonService : ICarbonService
{
    private readonly IConfiguration _config;

    public CarbonService(IConfiguration config)
    {
        _config = config;
    }

    public double Calculate(string category, double quantity)
    {
        // Fetch factor from appsettings.json, default to 0 if not found
        double factor = _config.GetValue<double>($"CarbonFactors:{category}");
        
        return quantity * factor;
    }
}