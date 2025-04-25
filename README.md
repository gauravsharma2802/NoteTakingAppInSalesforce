# 📝 NoteTakingAppInSalesforce

A lightweight, Lightning Web Component (LWC)-based note-taking application built on the Salesforce Platform. Designed for internal users or Experience Cloud sites, this app allows users to create, read, and manage personal or case-related notes directly within Salesforce.

---

## 🚀 Features

- ✍️ Create and save custom notes
- 📋 View a list of saved notes in real-time
- 🔄 Dynamic UI built with Lightning Web Components (LWC)
- 🔐 Access control for secure Apex class invocation
- 🌐 Deployable to internal users or public Experience Cloud sites

---

## 🛠️ Tech Stack

- **Salesforce Platform**
- **Lightning Web Components (LWC)**
- **Apex (backend logic)**
- **Experience Cloud (optional for public sites)**

---


---

## ⚙️ Setup Instructions

1. **Clone the repo & open in VS Code**
2. Make sure you’re authenticated to a Salesforce org with:
   ```bash
   sfdx auth:web:login
Deploy the component

sfdx force:source:deploy -p force-app/main/default/lwc/noteTakingApp
Assign Apex Class Access (for Experience Cloud):

Go to: Setup → Sites → [Your Site] → Public Access Settings

Add your Apex class under "Apex Class Access"

Add the component to your Lightning App Builder or Site Page.

🔐 Permissions
For public site access:

Ensure Apex classes used are @AuraEnabled

Apex access must be granted to the Guest User Profile

💡 Future Enhancements
🔍 Search or filter notes

🧠 GPT integration for AI-generated note summaries

📆 Note reminders via flow automation

🧑‍💻 Author
Built with 💙 by Gaurav Sharma
Feel free to contribute or customize for your org!



Link to access the page -: https://devvserver-dev-ed.develop.my.site.com/noteTakingApp/
# NoteTakingAppInSalesforce
=======
# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

