output "static_site_url" {
  description = "The URL of the Static Web App"
  value       = azurerm_static_site.static_site.default_hostname
}
