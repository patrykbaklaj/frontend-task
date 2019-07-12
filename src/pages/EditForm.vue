<template>
    <div class="page user-edit">
        <h1 class="user-edit__header">Edit User with id: {{ $route.params.id }}</h1>
        <div v-if="loading" class="user-edit__loading">Loading...</div>
        <form v-else class="user-edit__form" v-on:submit.prevent="(e) => e.preventDefault()">
            <!-- <form v-else class="user-edit__form" v-on:submit.prevent> -->
            <div class="user-edit__input-group">
                <label class="user-edit__label" for="name">Name</label>
                <input class="user-edit__input" v-model="employee.name" type="text" name="name" />
            </div>
            <div class="user-edit__input-group">
                <label class="user-edit__label" for="street">Address - street</label>
                <input
                    class="user-edit__input"
                    v-model="employee.address.street"
                    type="text"
                    name="street"
                />
            </div>
            <div class="user-edit__input-group">
                <label class="user-edit__label" for="suite">Address - suite</label>
                <input
                    class="user-edit__input"
                    v-model="employee.address.suite"
                    type="text"
                    name="suite"
                />
            </div>
            <div class="user-edit__input-group">
                <label class="user-edit__label" for="city">Address - city</label>
                <input class="user-edit__input" type="text" v-model="employee.address.city" name />
            </div>
            <div class="user-edit__input-group">
                <label class="user-edit__label" for="phone">Phone</label>
                <input class="user-edit__input" type="text" v-model="employee.phone" name="phone" />
            </div>
            <div class="user-edit__input-group">
                <label class="user-edit__label" for="email">Email</label>
                <input class="user-edit__input" type="email" v-model="employee.email" name="email" />
            </div>
            <div class="user-edit__action">
                <Button
                    value="save"
                    class="button-success"
                    @buttonClicked="handleSaveClick"
                    type="submit"
                ></Button>
                <Button value="cancel" class="button-danger" @buttonClicked="handleCancelClick"></Button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import Button from "@components/Button";
import router from "../router";

export default {
    data() {
        return {
            loading: false,
            employee: null,
            userId: this.$route.params.id
        };
    },
    created() {
        this.fetchData();
    },
    watch: {
        $route: "fetchData"
    },
    methods: {
        fetchData() {
            this.loading = true;

            axios
                // .get("https://jsonplaceholder.typicode.com/users")
                .get(`http://localhost:3000/users/${this.userId}`)
                .then(({ data }) => {
                    this.employee = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleSaveClick(id) {
            axios
                .patch(
                    // `https://jsonplaceholder.typicode.com/users/${this.userId}`
                    `http://localhost:3000/users/${this.userId}`,
                    this.employee
                )
                .then(({ data }) => {
                    this.employee = data;
                })
                .finally(() => {
                    // after user updat, redirect to list
                    router.push(`/list`);
                });
        },
        handleCancelClick() {
            router.push(`/list`);
        }
    },
    components: {
        Button
    }
};
</script>
<style lang="scss" scoped>
.user-edit {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__form {
        margin: 1em 0 1em 0;
        min-width: 60%;
        box-shadow: 5px 5px 10px #ced0d0;
        padding: 3em;
    }

    &__input-group {
        display: flex;
        margin-bottom: 1.2em;
        font-size: 0.9em;
    }

    &__label {
        width: 30%;
        line-height: 2.5;
        font-weight: bold;
    }
    &__input {
        width: 70%;
        padding: 0.375em 0.75em;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25em;
    }

    &__action {
        display: flex;
        justify-content: space-between;
        margin-top: 2em;
    }

    & [class^="button"] {
        width: 45%;
    }
}

@media screen and (max-width: 768px) {
    .user-edit {
        &__form {
            min-width: 80%;
        }

        &__input-group {
            flex-direction: column;
        }

        &__label {
            width: 100%;
        }
        &__input {
            width: 100%;
        }
    }
}
</style>