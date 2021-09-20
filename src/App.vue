<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
		<a href="/" class="navbar-brand">Vue3AuthJWT</a>
		<div class="navbar-nav me-auto">
			<li class="nav-item">
				<router-link to="/home" class="nav-link">
					<fa-icon icon="home"/> Home
				</router-link>
			</li>
			<li v-if="showAdminBoard" class="nav-item">
				<router-link to="/admin" class="nav-link"></router-link>
			</li>
			<li v-if="showModeratorBoard" class="nav-item">
				<router-link to="/mod" class="nav-link">Moderator Board</router-link>
			</li>
			<li class="nav-item">
				<router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
			</li>
		</div>

		<div class="navbar-nav ml-auto" v-show="!currentUser">
			<li class="nav-item">
				<router-link to="/register" class="nav-link">
					<fa-icon icon="user-plus"/> Sign Up
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/login" class="nav-link">
					<fa-icon icon="sign-in-alt"/> Login
				</router-link>
			</li>
		</div>
		<div class="navbar-nav ml-auto" v-show="currentUser">
			<li class="nav-item">
				<button @click="logOut" class="btn nav-link">
					<fa-icon icon="sign-out-alt"/> 
					Logout
				</button>
			</li>
		</div>
	</nav>

	<div class="container">
		<router-view></router-view>
	</div>
</template>

<script>
import EventBus from "./common/EventBus"
export default {
  name: 'App',
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
		showAdminBoard() {
			if (this.currentUser && this.currentUser['roles']) {
				return this.currentUser['roles'].includes('ROLE_ADMIN');
			}

			return false;
		},
		showModeratorBoard() {
			if (this.currentUser && this.currentUser['roles']) {
				return this.currentUser['roles'].includes('ROLE_MODERATOR');
			}

			return false;
		},
	},
	methods: {
		logOut() {
			this.$store.dispatch('auth/logout');
			this.$router.push('/login');
		}
	},
	mounted() {
		EventBus.on('logOut', () => {
			this.logOut();
		});
	},
	deforeDestroy() {
		EventBus.remove('logout');
	}
};
</script>

<style>
</style>
