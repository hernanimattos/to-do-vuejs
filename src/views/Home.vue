<template>
  <div class="home">
    <task/>
  </div>
</template>

<script>
// @ is an alias to /src
import task from '@/components/task.vue';

export default {
  name: 'home',
  components: {
    task,
  },
};
</script>
