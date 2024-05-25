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
