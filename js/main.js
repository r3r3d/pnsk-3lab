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
        `,}))