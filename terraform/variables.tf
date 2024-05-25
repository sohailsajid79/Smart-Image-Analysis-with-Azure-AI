variable "azure_client_id" {
  description = "The Client ID of the Azure Service Principal"
  type        = string
}

variable "azure_client_secret" {
  description = "The Client Secret of the Azure Service Principal"
  type        = string
}

variable "azure_subscription_id" {
  description = "The Subscription ID for the Azure account"
  type        = string
}

variable "azure_tenant_id" {
  description = "The Tenant ID of the Azure Service Principal"
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "The Azure region to deploy to"
  type        = string
  default     = "East US"
}

variable "static_web_app_name" {
  description = "The name of the Static Web App"
  type        = string
}

variable "app_location" {
  description = "The location of the app"
  type        = string
  default     = "./"
}

variable "api_location" {
  description = "The location of the API"
  type        = string
  default     = "api"
}

variable "output_location" {
  description = "The output location of the build"
  type        = string
  default     = "build"
}
