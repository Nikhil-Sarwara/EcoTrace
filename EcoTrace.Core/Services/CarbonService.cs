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

    public double Calculate(string category, string type, double quantity)
    {
        string configPath = $"CarbonFactors:{category}:{type}";

        double factor = _config.GetValue<double>(configPath);

        return Math.Round(quantity * factor, 2);
    }
}