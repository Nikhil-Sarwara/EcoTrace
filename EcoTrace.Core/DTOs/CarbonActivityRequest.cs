namespace EcoTrace.Core.DTOs;

public class CreateActivityRequest
{
    // This is all we need from the React frontend
    public string Category { get; set; } = string.Empty;
    public double Quantity { get; set; }
}