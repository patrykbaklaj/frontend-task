<template>
    <div class="app">
        <Header />
        <div class="pages-container">
            <router-view />
        </div>
        <Footer />
    </div>
</template>
<script>
    import Header from '@components/Header';
    import Footer from '@components/Footer';

    export default {
        components: {
            Header,
            Footer,
        }
    };
</script>
<style lang="scss" scoped>
    .app {
        position: relative;
        min-height: 100vh;
        padding-bottom: 80px;
    }

    .pages-container {
        max-width: 1080px;
        margin: 0 auto;
    }
</style>