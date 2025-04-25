import { LightningElement, api } from "lwc"

export default class Notification extends LightningElement {
  showNotification = false
  message = ""
  variant = "success"
  timeoutId

  get notificationClass() {
    return `notification ${this.variant}`
  }

  get iconName() {
    switch (this.variant) {
      case "success":
        return "utility:success"
      case "error":
        return "utility:error"
      case "warning":
        return "utility:warning"
      default:
        return "utility:info"
    }
  }

  @api
  showToast(message, variant) {
    this.message = message || "Notification"
    this.variant = variant || "success"
    this.showNotification = true

    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    // Auto-hide after 5 seconds
    this.timeoutId = setTimeout(() => {
      this.closeNotification()
    }, 5000)
  }

  closeNotification() {
    this.showNotification = false
  }
}
