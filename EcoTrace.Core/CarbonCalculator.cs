namespace EcoTrace.Core;

public static class CarbonCalculator
{
    /// <summary>
    /// Calculates CO2 in kilograms based on the category and quantity.
    /// </summary>
    public static double Calculate(string category, double quantity)
    {
        // These factors are kg of CO2 per unit (miles, kWh, lbs)
        return category.ToLower() switch
        {
            "Transport"     => quantity * 0.411, // Avg kg CO2 per mile (Passenger Car)
            "Home energy" => quantity * 0.385, // Avg kg CO2 per kWh
            "Food"        => quantity * 12.5,   // Avg kg CO2 per lb of beef
            _             => 0                 // Default if category isn't found
        };
    }
}