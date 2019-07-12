<template>
    <button class="button" @click="dispatchEvent(id)">{{value}}</button>
</template>

<script>
export default {
    // get props
    props: ["value", "id", "className"],

    // define methods
    methods: {
        // define method to handle button click event and delegate it to parent element
        dispatchEvent(id) {
            this.$emit("buttonClicked", id);
        }
    }
};
</script>

<style lang="scss" scoped>
.button {
    cursor: pointer;
    border: 1px solid;
    background-color: transparent;
    border-radius: 5px;
    outline: none;
    padding: 0.4em 1.2em;
    transition: all 0.25s;

    &:hover {
        background-color: #000;
        color: #fff;
    }

    &-edit {
        border-color: #ff9800;
        color: #ff9800;

        &:hover {
            background-color: #ff9800;
            color: white;
        }
    }

    &-success {
        border-color: #24bd31;
        color: #24bd31;

        &:hover {
            background-color: #24bd31;
            color: white;
        }
    }

    &-danger {
        border-color: red;
        color: red;

        &:hover {
            background-color: red;
            color: white;
        }
    }
}
</style>