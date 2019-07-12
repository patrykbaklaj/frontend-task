import Vue from 'vue';
import VueRouter from 'vue-router';
import EmployeesList from '@pages/EmployeesList';
// import EditForm Component
import EditForm from '@pages/EditForm';


Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: 'list',
        },
        {
            path: '/list',
            name: 'employeesList',
            component: EmployeesList,
        },
        {
            path: '/edit/:id',
            name: 'editForm',
            component: EditForm
        }
    ],
});

export default router;