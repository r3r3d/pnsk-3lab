let eventBus = new Vue()
Vue.component('create-note', {
    template: `
        <div>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
            <form class="d-flex flex-column  " v-on:submit.prevent="createNote">
                <fieldset>
                    <input class="form-control mb-3"style="border-radius:30px" type="text" placeholder="Name" v-model="title">
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="textarea" style="height: 100px; resize: none; border-radius:30px" v-model="description"></textarea>
                        <label for="textarea">Description:</label>
                    </div>
                    <div class="mb-4">
                        <label class="color-coral" for="deadline">Dead_line</label>
                        <input class="mt-3" name="deadline" type="date" min="2023-01-01" v-model="dateDeadline">
                    </div>
                    <input v-if="!update" class="btn " type="submit" value="Create">
                    <input v-if="update" class="btn btn-primary" v-on:click="updateNote" v-on:click="modal" value="Change">
                    <div v-if="!update" class="btn  " v-on:click="modal">Close</div>
                </fieldset>
            </form>
        </div>
    `},
    Vue.component('create-note', {
        template: `
            <div>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
                <form class="d-flex flex-column  " v-on:submit.prevent="createNote">
                    <fieldset>
                        <input class="form-control mb-3"style="border-radius:30px" type="text" placeholder="Name" v-model="title">
                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="textarea" style="height: 100px; resize: none; border-radius:30px" v-model="description"></textarea>
                            <label for="textarea">Opisanie:</label>
                        </div>
                        <div class="mb-4">
                            <label class="color-coral" for="deadline">Dead_line</label>
                            <input class="mt-3" name="deadline" type="date" min="2023-01-01" v-model="dateDeadline">
                        </div>
                        <input v-if="!update" class="btn " type="submit" value="Создать">
                        <input v-if="update" class="btn btn-primary" v-on:click="updateNote" v-on:click="modal" value="Изменить">
                        <div v-if="!update" class="btn  " v-on:click="modal">Закрыть форму</div>
                    </fieldset>
                </form>
            </div>
        `,
        methods: {
            openUpdateNote() {
                let display = true
                eventBus.$emit('update-display', display)
                let deadline = this.note.dateDeadline.split('.')
                this.noteId = this.note.noteId
                this.title = this.note.title
                this.description = this.note.description
                this.dateDeadline = deadline[2] + '-' + deadline[1] + '-' + deadline[0]
            },
            modal() {
                let displayModal = false
                eventBus.$emit('getModal', displayModal)
            },
            createNote() {
                if (this.title && this.description && this.dateDeadline) {
                    let inputDate = this.dateDeadline.split('-')
                    let note = {
                        noteId: this.noteId += 1,
                        title: this.title,
                        description: this.description,
                        type: 'col-1',
                        dateCreate: new Date().toLocaleDateString(),
                        dateDeadline: inputDate[2] + '.' + inputDate[1] + '.' + inputDate[0],
                        dateUpdate: '',
                        dateComplite: '',
                        comment: '',
                        compliteInTime: ''
                    }
                    eventBus.$emit('note-created', note)
                    this.title = null
                    this.description = null
                    this.dateDeadline = null
                    this.errors = []
                    this.modal()
                } else {
                    this.errors = []
                    if (!this.title) this.errors.push("Введите заголовок!")
                    if (!this.description) this.errors.push("Введите описание задачи!")
                    if (!this.dateDeadline) this.errors.push("Введите дату дэдлайна!")
                }
            },
            updateNote() {
                if (this.title && this.description && this.dateDeadline) {
                    let inputDate = this.dateDeadline.split('-')
                    let updatedNote = {
                        noteId: this.noteId,
                        title: this.title,
                        description: this.description,
                        type: this.note.type,
                        dateCreate: this.note.dateCreate,
                        dateDeadline: inputDate[2] + '.' + inputDate[1] + '.' + inputDate[0],
                        dateUpdate: new Date().toLocaleDateString(),
                        dateComplite: '',
                        comment: this.note.comment,
                        compliteInTime: ''
                    }
                    eventBus.$emit('note-updated', updatedNote)
                    this.title = null
                    this.description = null
                    this.dateDeadline = null
                    this.errors = []
                    this.update = false
                } else {
                    this.errors = []
                    if (!this.title) this.errors.push("Введите заголовок!")
                    if (!this.description) this.errors.push("Введите описание задачи!")
                    if (!this.dateDeadline) this.errors.push("Введите дату дэдлайна!")
                }
            },
        },
        mounted() {
            eventBus.$on('update-note', note => {
                this.note = note
                this.update = true
                this.openUpdateNote()
            })
        },
        data() {
            return {
                noteId: 0,
                title: '',
                description: '',
                dateDeadline: '',
                note: '',
                update: false,
                errors: []
            }
        },
    })
    Vue.component('note', {
            props: {
                types: ''
            },
            
            template: `
                <div>
                    <div class="m-3" v-for="note in notes" 
                    v-show="note.type == types ">
                        <div 
                            class="p-3 " 
                            :class="{ 
                                'border-success': note.compliteInTime, 
                                'border-danger': !note.compliteInTime && note.type == 'col-4', 
                                'border-primary': !note.compliteInTime, 
                                'border-warning': note.comment.length != 0,
                            }"
        >
                            <h5>{{note.title}} 
                            ({{note.noteId}}) - <span style="color: red;"
                             v-on:click="deleteNote(note.noteId)">
                             X
                             </span>
                             </h5>
                            <p>{{ note.description }}</p>
                            <p><hr>
                            Дата создания: {{ note.dateCreate }}<br>
                            Дэдлайн: {{ note.dateDeadline }} - {{ note.compliteInTime }}<br>
                            <span v-if="note.dateUpdate.length != 0">
                            Redact date: {{ note.dateUpdate }}</span>
                            <hr>
                            </p>
                            <p v-if="note.comment.length > 0">
                            Comments:<br>{{ note.comment }}</p>
                            <div v-if="note.type != 'col-4'">
                                <span class="btn " 
                                v-on:click="noteUpdate(note)">
                                Redact
                                </span>
                                <div class="mt-2">
                                    <span class="btn " 
                                    v-on:click="changeType(note)">
                                    Next
                                    </span>
                                    <span v-if="note.type == 'col-3'" class="btn " 
                                    v-on:click="comeBack(note)">back</span>
                                    <div class="mt-3" v-if="note.type == 'col-3'">
                                        <form>
                                            <div class="form-floating mb-3">
                                                <textarea class="form-control comeback" id="textarea" 
                                                style="height: 100px; resize: none;" v-model="comment"></textarea>
                                                <label for="textarea">Причина возврата:</label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,}))