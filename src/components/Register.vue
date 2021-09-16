<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" class="profile-img-card">
            <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                    <div class="mb-3">
                        <label for="username">Username</label>
                        <Field name="username" type="text" class="form-control"/>
                        <ErrorMessage name="username" class="text-danger"/>
                    </div>

                    <div class="mb-3">
                        <label for="email">Email</label>
                        <Field name="email" type="email" class="form-control"/>
                        <ErrorMessage name="email" class="text-danger"/>
                    </div>

                    <div class="mb-3">
                        <label for="password">Password</label>
                        <Field name="password" type="password" class="form-control"/>
                        <ErrorMessage name="password" class="text-danger"/>
                    </div>

                    <div class="mb-3">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <span>Sign Up</span>
                        </button>
                    </div>
                </div>
            </Form>

            <div class="mb-3">
                <div v-if="message" class="alert" :class="successful ? 'alert-success' : ' alert-danger'" role="alert">
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
    name: 'Register',
    components: {
        Form, Field, ErrorMessage
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required('Username is required!').min(3, 'Must be at least 3 characters!').max(20, 'Must be a maximum of 20 characters').label('Username'),
            email: yup.string().required('Email is required!').email('Email is invalid!').max(50, 'Must be maximum of 50 characters!'),
            password: yup.string().required('Password is required!').min(8, 'Must be at least 6 characters!').max(20, 'Must be a max of 20 characters!').label('Password'),
        });
        return {
            successful: false,
            loading: false,
            message: '',
            schema,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        if(this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleRegister(user) {
            this.message = '';
            this.successful = false;
            this.loading = true;

            this.$store.dispatch('auth/register', user).then (
                (data) => {
                    this.message = data.message;
                    this.successful = true;
                    this.loading = false;
                },
                (error) => {
                    this.message = (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                    this.successful = false;
                    this.loading = false;
                }
            );
        },
    },
}
</script>

<style>

</style>