<template>
    <header class="page-header">
        <div class="page-header__content">
            <div class="page-header__container">
                <div class="page-header__logo" @click="onLogoClick">
                    <Logo />
                </div>
                <div>
                    <ul
                        class="page-header__nav"
                        :class="[hamburgerClicked ? activeClass : inactiveClass]"
                    >
                        <li class="page-header__nav-item">
                            <a href="#">Item 1</a>
                        </li>
                        <li class="page-header__nav-item">
                            <a href="#">Item 2</a>
                        </li>
                        <li class="page-header__nav-item">
                            <a href="#">Item 3</a>
                        </li>
                    </ul>
                </div>
                <button class="page-header__button" @click="hamburgerClicked = !hamburgerClicked">
                    <Bars v-if="!hamburgerClicked" />
                    <Cross v-else />
                </button>
            </div>
        </div>
    </header>
</template>

<script>
import Logo from "@img/fitatu.svg";
// import icons
import Bars from "@img/bars.svg";
import Cross from "@img/cross.svg";
// import router
import router from "../router";

export default {
    props: {
        onLogoClick: {
            type: Function,
            default: () => {
                router.push(`/list`);
            }
        }
    },
    data() {
        return {
            hamburgerClicked: false,
            inactiveClass: "inactive",
            activeClass: "active"
        };
    },
    components: {
        Logo,
        Bars,
        Cross
    }
};
</script>

<style lang="scss" scoped>
.page-header {
    height: 60px;

    &__container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 1080px;
    }

    &__content {
        background-color: #fff;
        box-shadow: 0 0 15px #ced0d0;
        height: inherit;
        position: fixed;
        width: 100%;
        z-index: 11;
    }

    &__logo,
    &__button {
        cursor: pointer;
    }

    &__nav {
        display: flex;
        justify-content: end;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    &__nav-item {
        cursor: pointer;
        font-size: 1.1em;
        list-style-type: none;
        margin: 0;
        margin-left: 0.75em;
        padding: 0.4em 1.2em;
        position: relative;

        a {
            color: #000;
            text-decoration: none;
        }

        &::after {
            background-color: #000;
            bottom: -1px;
            content: "";
            display: block;
            position: absolute;
            transition: all 0.25s;
            width: 0;
        }

        &:hover {
            &::after {
                height: 2px;
                left: 0;
                width: 100%;
            }
        }
    }

    &__button {
        display: none;
    }

    //media queries
    @media screen and (max-width: 768px) {
        // responsive menu
        &__nav {
            align-items: center;
            background: #fff;
            box-shadow: 0px 5px 5px #ced0d0;
            flex-direction: column;
            left: 0;
            padding: 1em;
            position: absolute;
            top: 100%;
            width: 100%;

            &.inactive {
                display: none;
            }
            &.active {
                display: flex;
            }
        }
        &__button {
            background: none;
            border: none;
            display: block;
            margin: 1em;
            outline: none;

            svg {
                width: 25px;
            }
        }
    }
}
</style>