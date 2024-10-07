<script setup>
const developers = [

  {
    name: 'Hugo',
    githubLink: 'https://github.com/hugoperez11',
    avatar: '/src/assets/img/hugo.jpg'
  },

]
</script>

<template>
  <div class="footer-container">
    <div class="footer-text">
      <p>© 2024 Florida Beach Hotel. All rights reserved.</p>
    </div>
    <div class="avatars-container">
      <a class="avatar-wrapper" v-for="developer in developers" :key="developer.name" :href="developer.githubLink" target="_blank" rel="noopener noreferrer">
        <img :src="developer.avatar" :alt="developer.name" class="developer-avatar" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  background-color: #7fa5ec;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  flex-wrap: wrap;
}

.footer-text {
  font-size: 0.95rem;
  color: white;
}

.avatars-container {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.avatar-wrapper {
  padding: 2px;
  display: inline-block;
  margin-right: 30px;
}

.developer-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: opacity 0.3s;
}

.developer-avatar:hover {
  opacity: 0.8;
}
</style>

