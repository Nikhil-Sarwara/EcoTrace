using System.ComponentModel.DataAnnotations;

namespace EcoTrace.Core.DTOs;

public class CreateActivityRequest
{
    [Required(ErrorMessage = "Category is required")]
    public string Category { get; set; } = string.Empty;

    [Range(0.01, 10000, ErrorMessage = "Quantity must be between 0.01 and 10,000")]
    public double Quantity { get; set; }
}