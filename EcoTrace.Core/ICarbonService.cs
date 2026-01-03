namespace EcoTrace.Core.Interfaces;

public interface ICarbonService
{
    double Calculate(string category, double quantity);
}