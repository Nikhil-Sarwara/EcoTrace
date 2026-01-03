namespace EcoTrace.Core;

public class CarbonActivity
{
    // Primary Key for the Database
    public int Id { get; set; }

    // What the user did (Driving, Electricity, Meat)
    public string Category { get; set; } = string.Empty;

    // The raw input from the user (e.g., 50 miles)
    public double Quantity { get; set; }

    // The result after the .NET math (e.g., 20.0 kg CO2)
    public double TotalCO2 { get; set; }

    // When this was recorded
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}