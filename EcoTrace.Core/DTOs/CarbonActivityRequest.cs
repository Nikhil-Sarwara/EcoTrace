using System.ComponentModel.DataAnnotations;

namespace EcoTrace.Core.DTOs;

public class CreateActivityRequest
{
    [Required(ErrorMessage = "Category is required")]
    public string Category { get; set; } = string.Empty;

    [Required(ErrorMessage = "Activity name is required")]
    [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Type is required")]
    public string Type { get; set; } = string.Empty;

    [Range(0.01, 100000, ErrorMessage = "Quantity must be greater than 0")]
    public double Quantity { get; set; }
}