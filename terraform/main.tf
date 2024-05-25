resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_static_site" "static_site" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_tier            = "Free"

  build_properties {
    app_location             = "./"  # Adjust as necessary
    api_location             = "api"
    output_location          = "build"
  }
}

output "static_site_url" {
  value = azurerm_static_site.static_site.default_hostname
}
