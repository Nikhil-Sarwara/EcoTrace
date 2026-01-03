namespace EcoTrace.Core.Interfaces;

public interface ICarbonService
{
    double Calculate(string category, string type, double quantity);
}