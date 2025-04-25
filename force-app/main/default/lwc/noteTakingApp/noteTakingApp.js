import { LightningElement, wire, track } from "lwc"
import { refreshApex } from "@salesforce/apex"
import LightningConfirm from "lightning/confirm"
import createNoteRecord from "@salesforce/apex/NoteTakingController.createNoteRecord"
import getNotes from "@salesforce/apex/NoteTakingController.getNotes"
import updateNoteRecord from "@salesforce/apex/NoteTakingController.updateNoteRecord"
import deleteNoteRecord from "@salesforce/apex/NoteTakingController.deleteNoteRecord"

const DEFAULT_NOTE_FORM = {
  Name: "",
  Note_Description__c: "",
  Category__c: "Personal",
}

export default class NoteTakingApp extends LightningElement {
  @track showModal = false
  @track noteRecord = { ...DEFAULT_NOTE_FORM }
  @track noteList = []
  selectedRecordId
  wiredNoteResult

  formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "clean",
    "table",
    "header",
    "color",
    "background",
    "code",
    "code-block",
    "script",
    "blockquote",
    "direction",
  ]

  categoryOptions = [
    { label: "Personal", value: "Personal" },
    { label: "Work", value: "Work" },
    { label: "Ideas", value: "Ideas" },
    { label: "To-Do", value: "To-Do" },
    { label: "Important", value: "Important" },
  ]

  get isFormInvalid() {
    return !(this.noteRecord && this.noteRecord.Name && this.noteRecord.Note_Description__c)
  }

  get modalTitle() {
    return this.selectedRecordId ? "Edit Note" : "Create New Note"
  }

  get submitButtonLabel() {
    return this.selectedRecordId ? "Update" : "Create"
  }

  @wire(getNotes)
  noteListInfo(result) {
    this.wiredNoteResult = result
    const { data, error } = result
    if (data) {
      this.noteList = data.map((item) => {
        const formattedDate = new Date(item.LastModifiedDate).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

        // Assign color based on category
        let categoryStyle = ""
        switch (item.Category__c) {
          case "Personal":
            categoryStyle = "background-color: #4CAF50;" // Green
            break
          case "Work":
            categoryStyle = "background-color: #2196F3;" // Blue
            break
          case "Ideas":
            categoryStyle = "background-color: #9C27B0;" // Purple
            break
          case "To-Do":
            categoryStyle = "background-color: #FF9800;" // Orange
            break
          case "Important":
            categoryStyle = "background-color: #F44336;" // Red
            break
          default:
            categoryStyle = "background-color: #607D8B;" // Blue Grey
        }

        return { ...item, formattedDate, categoryStyle }
      })
    }
    if (error) {
      console.error("Error fetching notes:", error)
      this.showToastMsg(error.body.message, "error")
    }
  }

  createNoteHandler() {
    this.noteRecord = { ...DEFAULT_NOTE_FORM }
    this.selectedRecordId = null
    this.showModal = true
  }

  closeModalHandler() {
    this.showModal = false
    this.noteRecord = { ...DEFAULT_NOTE_FORM }
    this.selectedRecordId = null
  }

  changeHandler(event) {
    const { name, value } = event.target
    this.noteRecord = { ...this.noteRecord, [name]: value }
  }

  formSubmitHandler(event) {
    event.preventDefault()
    if (this.selectedRecordId) {
      this.updateNote(this.selectedRecordId)
    } else {
      this.createNote()
    }
  }

  createNote() {
    const { Name, Note_Description__c, Category__c } = this.noteRecord
    createNoteRecord({
      title: Name,
      description: Note_Description__c,
      category: Category__c,
    })
      .then(() => {
        this.showModal = false
        this.showToastMsg("Note created successfully!", "success")
        this.refresh()
      })
      .catch((error) => {
        console.error("Error creating note:", error)
        this.showToastMsg(error.body.message, "error")
      })
  }

  editNoteHandler(event) {
    const recordId = event.target.dataset.recordid
    const noteRecord = this.noteList.find((item) => item.Id === recordId)
    this.noteRecord = {
      Name: noteRecord.Name,
      Note_Description__c: noteRecord.Note_Description__c,
      Category__c: noteRecord.Category__c || "Personal",
    }
    this.selectedRecordId = recordId
    this.showModal = true
  }

  updateNote(noteId) {
    const { Name, Note_Description__c, Category__c } = this.noteRecord
    updateNoteRecord({
      noteId: noteId,
      title: Name,
      description: Note_Description__c,
      category: Category__c,
    })
      .then(() => {
        this.showModal = false
        this.selectedRecordId = null
        this.showToastMsg("Note updated successfully!", "success")
        this.refresh()
      })
      .catch((error) => {
        console.error("Error updating note:", error)
        this.showToastMsg(error.body.message, "error")
      })
  }

  async deleteNoteHandler(event) {
    const recordId = event.target.dataset.recordid
    this.selectedRecordId = recordId

    const result = await LightningConfirm.open({
      message: "Are you sure you want to delete this note?",
      variant: "headerless",
      label: "Delete Confirmation",
    })

    if (result) {
      deleteNoteRecord({ noteId: this.selectedRecordId })
        .then(() => {
          this.selectedRecordId = null
          this.showToastMsg("Note deleted successfully!", "success")
          this.refresh()
        })
        .catch((error) => {
          console.error("Error deleting note:", error)
          this.showToastMsg(error.body.message, "error")
        })
    } else {
      this.selectedRecordId = null
    }
  }

  refresh() {
    return refreshApex(this.wiredNoteResult)
  }

  showToastMsg(message, variant) {
    const notificationComponent = this.template.querySelector("c-notification")
    if (notificationComponent) {
      notificationComponent.showToast(message, variant)
    }
  }
}
