<template>
    <div class="page employees-list">
        <h1 class="employees-list__header">Employees</h1>
        <div v-if="loading" class="employees-list__loading">Loading...</div>
        <table v-else class="employees-list__list">
            <tr class="employees-list__list-header">
                <th>id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            <tr v-for="employee in employees" class="employees-list__list-row" :key="employee.id">
                <td data-title="id">{{employee.id}}</td>
                <td data-title="name">{{employee.name}}</td>
                <td data-title="address">{{employee.address.street}} {{employee.address.suite}} {{employee.address.city}}</td>
                <td data-title="phone">{{employee.phone}}</td>
                <td data-title="email">
                    <a :href="`mailto:${ employee.email }`">{{employee.email}}</a>
                </td>
                <td data-title="actions">
                    <Button
                        value="edit"
                        class="button-edit"
                        :id="employee.id"
                        @buttonClicked="handleEditClick"
                    ></Button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from "axios";
// import Button Component
import Button from "@components/Button";
// import router to navigate on button click
import router from "../router";

export default {
    data() {
        return {
            loading: false,
            employees: []
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
                .get("http://localhost:3000/users/")
                .then(({ data }) => {
                    this.employees = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // method to handle button Click
        handleEditClick(id) {
            // redirect to edit form whith given id
            router.push(`/edit/${id}`);
        }
    },
    components: {
        Button
    }
};
</script>
<style lang="scss" scoped>
.employees-list {
    &__header {
        font-size: 20px;
        padding: 0 0 10px;
    }

    &__loading {
        color: #999d9d;
        text-align: center;
    }

    &__list {
        font-size: 14px;
        width: 100%;
        border-collapse: collapse;
    }

    &__list-header {
        background: #f7f8f9;
        border-bottom: 1px solid #999d9d;

        th {
            padding: 8px;
        }
    }

    &__list-row {
        background: #fff;

        td {
            padding: 8px;
        }
    }
}

// add media queries
@media only screen and (max-width: 768px) {
    // set display block to table elements
    .employees-list {
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
        }
        // hide table header
        &__list-header {
            th {
                display: none;
            }
        }

        tr {
            border-bottom: 1px solid #000;
        }
        // move table data to right
        td {
            border: none;
            border-bottom: 1px solid #ced4da;
            position: relative;
            padding-left: 40%;
            text-align: left;
        }

        td {
            // display labels for data
            &::before {
                position: absolute;
                top: 0;
                bottom: 0;
                line-height: 2;
                left: 10px;
                width: 35%;
                font-weight: bold;
            }
        }

        // label data as content
        td {
            &::before {
                content: attr(data-title);
            }
        }
    }
}
</style>