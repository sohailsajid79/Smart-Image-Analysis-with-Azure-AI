provider  "azurerm" {
  features {}

  tenant_id = var.azure_tenant_id
  subscription_id = var.azure_subscription_id
  client_id = var.azure_client_id
  client_secret = var.azure_client_secret
}

resource "azurerm_resource_group" "rg" {
  name = "ResourceGroup_ai_project"
  location = "UK South"
}

resource "azurerm_static_site" "static_site" {
  name                = "StaticWebApp"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku_tier = "Free"
  sku_size = "Free"

  app_location = "./"
  api_location = "api"
  output_location = "build"

  auth_settings {
    enabled = true
  }

  build_properties {
    app_location    = "./"
    api_location    = "api"
    output_location = "build"
  }
}

output "static_site_url" {
  value = azurerm_static_site.static_site.default_hostname
}